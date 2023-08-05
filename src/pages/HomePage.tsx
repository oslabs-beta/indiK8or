import { useState } from 'react';
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

  const handleDashboard = (): void =>
    setDashboardClicked((prevDashboardClicked) => !prevDashboardClicked);

  const handlePod = (): void =>
    setPodClicked((prevPodClicked) => !prevPodClicked);

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
            />
            <Dashboard dashboardClicked={dashboardClicked} podClicked={podClicked}/>
          </Grid>
        </ThemeProvider>
  );
};

export default HomePage;
