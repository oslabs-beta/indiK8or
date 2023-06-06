import { Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../components/Navigation.jsx'
import Dashboard from '../components/Dashboard.jsx'
import {useState} from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const HomePage = () => {

  const [dashboardClicked, setDashboardClicked] = useState(false);
  const handleDashboard = () => {setDashboardClicked(true)};
  

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
