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
  const navigate = useNavigate();
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const handleDashboard = () => setDashboardClicked(true);
  
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

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <Grid>
          <Navigation setDashboardClicked={ handleDashboard }/>
          <Dashboard dashboardClicked={ dashboardClicked }/>
      </Grid>
    </ThemeProvider>
  )
}

export default HomePage;
