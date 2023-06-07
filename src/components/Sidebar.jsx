import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PropTypes from 'prop-types'
import '../css/Sidebar.css'

// Pass the props component from the parent component (HomePage)
const Sidebar = (props) => {
  const { userId, dashboardClicked, darkMode, handleDashboard, setDarkMode } = props;
  // State variables to control the visibility of different texts in the sidebar
  const [showLogoutText, setShowLogoutText] = useState(false);
  const [showThemeText, setShowThemeText] = useState(false);
  const [showDashText, setShowDashText] = useState(false);

  // React Router hook for navigation
  const navigate = useNavigate();

  // Handles the logout button click
  const handleLogout = async () => {
    try {
      // Send logout request to the backend
      console.log('userId', userId)
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            userId: userId
          }),
      });
  
      if (response.status === 202) {
        // Handle successful logout
        alert('You have been successfully logged out. Redirecting to Welcome Page');
        navigate('/');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  // Event handlers for mouse hover text visibility on icons
  const handleMouseEnterDash = () => {
    setShowDashText(true);
  };

  const handleMouseLeaveDash = () => {
    setShowDashText(false);
  };

  const handleMouseEnterLogout = () => {
    setShowLogoutText(true);
  };

  const handleMouseLeaveLogout = () => {
    setShowLogoutText(false);
  };

  const handleMouseEnterTheme = () => {
    setShowThemeText(true);
  };

  const handleMouseLeaveTheme = () => {
    setShowThemeText(false);
  };

  // Function to handle dashboard toggle
  const handleDashToggle = () => {
    console.log(dashboardClicked, 'props')
    handleDashboard();
  };

  // Function to handle theme toggle
  const handleThemeToggle = () => {
    console.log(darkMode, 'props')
    // Set dark mode to opposite of current mode using prevState
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <Box className="sidebar">
        <img id='logo' src="src/assets/logo2.png" alt="logo" />
      {/* Navigation List */}
      <List>
        {/* Dashboard */}
        <ListItemButton
            //onMouse*** is property when cursor is hovering over element
            onMouseEnter={handleMouseEnterDash}
            onMouseLeave={handleMouseLeaveDash}
            onClick={handleDashToggle}
        >
            <ListItemIcon className="listItemIcon">
                <DashboardIcon sx={{ fontSize: 40}}/>
            </ListItemIcon>
            <ListItemText
                // primary is the content of the ListItemText, which is a conditional in this case
                primary={showDashText ? 'Dashboard' : ''}
                className="listItemText"
                primaryTypographyProps={{fontSize: '20px'}, {fontWeight: 'bold'}} 
            />
         </ListItemButton>

        {/* Logout */}
        <ListItemButton
            onMouseEnter={handleMouseEnterLogout}
            onMouseLeave={handleMouseLeaveLogout}
            onClick={handleLogout}
        >
            <ListItemIcon className="listItemIcon">
                <LogoutIcon sx={{ fontSize: 40}}/>
            </ListItemIcon>
            <ListItemText
                primary={showLogoutText ? 'Logout' : ''}
                className="listItemText"
                primaryTypographyProps={{fontSize: '20px'}, {fontWeight: 'bold'}}
            />
         </ListItemButton>

        {/* Theme (Icon is conditional based on the current state)*/}
        <ListItemButton
            className="listItem"
            onMouseEnter={handleMouseEnterTheme}
            onMouseLeave={handleMouseLeaveTheme}
            onClick={handleThemeToggle}
        >
            <ListItemIcon >
                {props.darkMode ? <Brightness7Icon sx={{ fontSize: 40}}/> : <Brightness4Icon sx={{ fontSize: 40}}/>}
            </ListItemIcon>
            <ListItemText
                primary={showThemeText ? 'Theme' : ''}
                className="listItemText"
               primaryTypographyProps={{fontSize: '20px'}, {fontWeight: 'bold'}}
            />
            </ListItemButton>
        </List>
    </Box>
  );
};

Sidebar.propTypes = {
  userId: PropTypes.string,
  dashboardClicked: PropTypes.bool,
  darkMode: PropTypes.bool,
  handleDashboard: PropTypes.func,
  setDarkMode: PropTypes.func,
}

export default Sidebar;