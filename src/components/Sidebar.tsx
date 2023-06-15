import { ReactElement, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import '../css/Sidebar.css'
import { SidebarProps } from '../../types'

// Pass the props component from the parent component (HomePage)
const Sidebar = () => {

  const handleMouseEnterDash = useAppSelector((state: RootState) => state.sideBar.showDashText);

  // React Router hook for navigation
  const navigate: NavigateFunction = useNavigate();

  // Handles the logout button click
  const handleLogout = async ():Promise<void> => {
    try {
      // Send logout request to the backend
      const response: Response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            userId: userId
          }),
      });
  
      if (response.ok) {
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
  // const handleMouseEnterDash = ():void  => {
  //   setShowDashText(true);
  // };

  // const handleMouseLeaveDash = ():void  => {
  //   setShowDashText(false);
  // };

  // const handleMouseEnterLogout = ():void  => {
  //   setShowLogoutText(true);
  // };

  // const handleMouseLeaveLogout = ():void  => {
  //   setShowLogoutText(false);
  // };

  // const handleMouseEnterTheme = ():void  => {
  //   setShowThemeText(true);
  // };

  // const handleMouseLeaveTheme = ():void => {
  //   setShowThemeText(false);
  // };

  // Function to handle dashboard toggle
  const handleDashToggle = ():void  => {
    handleDashboard();
  };

  // Function to handle theme toggle
  const handleThemeToggle = () => {
    // Set dark mode to opposite of current mode using prevState
    setDarkMode((prevDarkMode: boolean) => !prevDarkMode);
  };

  return (
    <Box className="sidebar">
      <img id='logo' src="src/assets/logo1.png" alt="logo" />
      {/* Navigation List */}
      <List className='list'>
        {/* Dashboard button */}
        <ListItemButton
            //onMouse*** is property when cursor is hovering over element
            data-testid='DashboardButton'
            onMouseEnter={handleMouseEnterDash}
            onMouseLeave={handleMouseLeaveDash}
            onClick={handleDashToggle}
        >
            <ListItemIcon className="listItemIcon">
                <DashboardIcon sx={{ fontSize: 50}}/>
            </ListItemIcon>
            <ListItemText
                // primary is the content of the ListItemText, which is a conditional in this case
                primary={showDashText ? 'Dashboard' : ''}
                className="listItemText"
                primaryTypographyProps={{fontSize: '20px', fontWeight: 'bold'}} 
            />
         </ListItemButton>
        {/* Logout button */}
        <ListItemButton
            data-testid='LogoutButton'
            onMouseEnter={handleMouseEnterLogout}
            onMouseLeave={handleMouseLeaveLogout}
            onClick={handleLogout}
        >
            <ListItemIcon className="listItemIcon">
                <LogoutIcon sx={{ fontSize: 50}}/>
            </ListItemIcon>
            <ListItemText
                primary={showLogoutText ? 'Logout' : ''}
                className="listItemText"
                primaryTypographyProps={{fontSize: '20px', fontWeight: 'bold'}}
            />
         </ListItemButton>
        {/* Theme (Icon is conditional based on the current state)*/}
        <ListItemButton
            data-testid='ThemeButton'
            className="listItem"
            onMouseEnter={handleMouseEnterTheme}
            onMouseLeave={handleMouseLeaveTheme}
            onClick={handleThemeToggle}
        >
            <ListItemIcon >
                {darkMode ? <Brightness7Icon sx={{ fontSize: 50}} data-testid='Brightness7Icon'/> : <Brightness4Icon sx={{ fontSize: 50}} data-testid='Brightness4Icon'/>}
            </ListItemIcon>
            <ListItemText
                primary={showThemeText ? 'Light/Dark' : ''}
                className="listItemText"
                primaryTypographyProps={{fontSize: '20px', fontWeight: 'bold'}}
            />
            </ListItemButton>
            {/*icon for pod button */}
            <ListItemButton
            data-testid='ThemeButton'
            className="listItem"
            onMouseEnter={handleMouseEnterTheme}
            onMouseLeave={handleMouseLeaveTheme}
            onClick={handleThemeToggle}
        >
            <ListItemIcon >
                {darkMode ? <Brightness7Icon sx={{ fontSize: 50}} data-testid='Brightness7Icon'/> : <Brightness4Icon sx={{ fontSize: 50}} data-testid='Brightness4Icon'/>}
            </ListItemIcon>
            <ListItemText
                primary={showThemeText ? 'Light/Dark' : ''}
                className="listItemText"
                primaryTypographyProps={{fontSize: '20px', fontWeight: 'bold'}}
            />
            </ListItemButton>
        </List>
    </Box>
  );
};

export default Sidebar;