import { Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from '../components/Dashboard.jsx'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const navigate = useNavigate();
  
  // Set the value of dashboardClicked to the opposite of its current value using func
  const handleDashboard = () => setDashboardClicked(prevDashboardClicked => !prevDashboardClicked);
  
  // check to see if user is logged in, if they are we set loggedIn to true and render ThemeProvider
  // if they are not logged in we will receive a 303 and send them to the loginPage
  useEffect(() => {
    fetch('http://localhost:4000/login/isLoggedIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // include cookies from cross origin request
        credentials: 'include',
        body: JSON.stringify({}),
      })
      .then((response) => {
        console.log(response);
        if (response.status === 303) {
          // Handle failed response
          alert('You must be logged in to view this page');
          navigate('/login/loginRequest');
        } else {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, [navigate]);

  // Create a dark theme if darkMode is true, otherwise create a light theme
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });
  
  // only render ThemeProvider if loggedIn is true, otherwise render nothing
  return (
     <>
      {loggedIn && (
      //pass props to the children
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Grid>
            <Sidebar dashboardClicked={dashboardClicked} handleDashboard={handleDashboard} darkMode={ darkMode } setDarkMode={ setDarkMode }/>
            <Dashboard dashboardClicked={ dashboardClicked } />
        </Grid>
      </ThemeProvider>
      )}
    </>
  )
}

export default HomePage;
