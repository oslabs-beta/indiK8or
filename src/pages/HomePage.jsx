import { Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from '../components/Dashboard.jsx'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  // Declare the dashboardClicked state
  const [dashboardClicked, setDashboardClicked] = useState(false);
  // Declare the darkMode state
  const [darkMode, setDarkMode] = useState(false);

  // Set the value of dashboardClicked to the opposite of its current value using func
  const handleDashboard = () => setDashboardClicked(prevDashboardClicked => !prevDashboardClicked);
  
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
          // Handle success response
          // Update the state to indicate user creation success
          alert('You must be logged in to view this page');
          navigate('/login/loginRequest');
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

  return (
    //pass props to the children
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <Grid>
          <Sidebar dashboardClicked={dashboardClicked} handleDashboard={handleDashboard} darkMode={ darkMode } setDarkMode={ setDarkMode }/>
          <Dashboard dashboardClicked={ dashboardClicked } />
      </Grid>
    </ThemeProvider>
  )
}

export default HomePage;
