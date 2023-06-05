// import './App.css' 
import * as React from 'react';
import { Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
// import { Routes,Route } from 'react-router-dom'
// import {Navigation, Modal, Dashboard} from '<div className="" />components'
import Navigation from '../components/Navigation.jsx'
import Modal from '../components/Modal.jsx'
import Dashboard from '../components/Dashboard.jsx'


const HomePage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <Grid>
          <Navigation/>
          <Dashboard />
          <Modal/>
      </Grid>
    </ThemeProvider>
  )
}

export default HomePage;
