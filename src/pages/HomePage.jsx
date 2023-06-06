import { Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../components/Navigation.jsx'
import Dashboard from '../components/Dashboard.jsx'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const handleDashboard = () => setDashboardClicked(true);
  const navigate = useNavigate();
  
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

  // only render ThemeProvider if loggedIn is true, otherwise render nothing
  return (
    <>
      {loggedIn &&(
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Grid>
            <Navigation setDashboardClicked={ handleDashboard }/>
            <Dashboard dashboardClicked={ dashboardClicked }/>
        </Grid>
      </ThemeProvider>
      )}
    </>
  );
};

export default HomePage;
