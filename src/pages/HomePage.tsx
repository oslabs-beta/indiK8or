import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn, setDashboardClicked, setDarkMode, setUserId } from '../slices/homePageSlice';
import { useAppSelector, useAppDispatch } from '../hooks.ts'
import Sidebar from '../components/Sidebar.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from '../components/Dashboard.tsx';
import '../css/HomePage.css';
import { RootState } from '../store.ts';


const HomePage = () => {

  const loggedIn = useAppSelector((state: RootState) => state.homePage.loggedIn);
  const dashboardClicked = useAppSelector((state) => state.homePage.dashboardClicked);
  const darkMode = useAppSelector((state) => state.homePage.darkMode);
  const userId = useAppSelector((state) => state.homePage.userId);
  //dispatch the actions
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Set the value of dashboardClicked to the opposite of its current value using func
  const handleDashboard = () => {
    dispatch(setDashboardClicked(!dashboardClicked));
  };
  // check to see if user is logged in, if they are we set loggedIn to true and render ThemeProvider
  // if they are not logged in we will receive a 303 and send them to the loginPage
  useEffect(() => {
    const checkLoggedIn = async () => {
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
          const userId = await response.json();
          dispatch(setUserId(userId));
          dispatch(setLoggedIn());
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkLoggedIn();
  }, [dispatch, navigate]);

  const darkTheme = createTheme({
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
          <Grid className='homePage' data-testid='screenComponent'>
            <Sidebar
              dashboardClicked={dashboardClicked}
              handleDashboard={handleDashboard}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              userId={userId}
            />
            <Dashboard dashboardClicked={dashboardClicked} />
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default HomePage;


