import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from '../components/Dashboard.tsx';
// import Pods from '../components/Pods.tsx';
import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import '../css/HomePage.css';
import { LightDarkTheme } from '../../types.ts';
import Sidebar from '../components/Sidebar.tsx';
const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [dashboardClicked, setDashboardClicked] = useState<boolean>(false);
  const [podClicked, setPodClicked] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const navigate: NavigateFunction = useNavigate();

  // Set the value of dashboardClicked to the opposite of its current value using func
  const handleDashboard = (): void =>
    setDashboardClicked((prevDashboardClicked) => !prevDashboardClicked);

  const handlePod = (): void =>
    setPodClicked((prevPodClicked) => !prevPodClicked);
  // check to see if user is logged in, if they are we set loggedIn to true and render ThemeProvider
  // if they are not logged in we will receive a 303 and send them to the loginPage
  useEffect(() => {
    const checkLoggedIn = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:4000/login/isLoggedIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          credentials: 'include',
          body: JSON.stringify({}),
        });
        if (response.status === 303) {
          alert('You must be logged in to view this page');
          navigate('/login/loginRequest');
        } else {
          const userId: string = await response.json();
          setUserId(userId);
          setLoggedIn(true);
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
    <>
      {loggedIn && (
        //pass props to the children
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
      )}
    </>
  );
};

export default HomePage;
