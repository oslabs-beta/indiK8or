import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LightDarkTheme } from '../../types';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
import '../css/HomePage.css';


const HomePage = () => {
  const [dashboardClicked, setDashboardClicked] = useState<boolean>(false);
  const [podClicked, setPodClicked] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const navigate: NavigateFunction = useNavigate();

  const handleDashboard = (): void =>
    setDashboardClicked((prevDashboardClicked) => !prevDashboardClicked);

  const handlePod = (): void =>
    setPodClicked((prevPodClicked) => !prevPodClicked);
  /*
  When HomePage loads, check to see if active session exists for user.
  If so set userId with their id, then display HomePage components.
  If no session is found, redirect user to LoginPage.
  */
  useEffect(() => {
    const checkLoggedIn = async (): Promise<void> => {
      try {
        const response = await fetch('/login/isLoggedIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          credentials: 'include',
          body: JSON.stringify({}),
        });
        if (response.status === 303) {
          // alert('You must be logged in to view this page');
          // navigate('/login/loginRequest');
        } else {
          const userId: string = await response.json();
          setUserId(userId);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkLoggedIn();
  }, [navigate]);
  const darkTheme: LightDarkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: darkMode ? { default: '#212529' } : { default: '#faf3dd' },
      text: {
        primary: darkMode ? '#ffffff' : '#353535',
      },
    },
  });
  // only render ThemeProvider if loggedIn is true, otherwise render nothing
  return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Grid className="homePage" data-testid="screenComponent">
            <Sidebar
              dashboardClicked={dashboardClicked}
              handleDashboard={handleDashboard}
              podClicked={podClicked}
              handlePod={handlePod}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              userId={userId}
            />
            <Dashboard dashboardClicked={dashboardClicked} podClicked={podClicked}/>
          </Grid>
        </ThemeProvider>
  );
};

export default HomePage;
