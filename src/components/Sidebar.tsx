import { ReactElement, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import '../css/Sidebar.css';
import { SidebarProps } from '../../types';

// Pass the props component from the parent component (HomePage)
const Sidebar = ({ userId, darkMode, dashboardClicked, podClicked, handleDashboard, handlePod, setDarkMode }: SidebarProps): ReactElement => {
  // State variables to control the visibility of different texts in the sidebar
  const [showLogoutText, setShowLogoutText] = useState<boolean>(false);
  const [showThemeText, setShowThemeText] = useState<boolean>(false);
  const [showDashText, setShowDashText] = useState<boolean>(false);
  const [showPodText, setShowPodText] = useState<boolean>(false);

  // React Router hook for navigation
  const navigate: NavigateFunction = useNavigate();

  // Handles the logout button click
  const handleLogout = async (): Promise<void> => {
    try {
      // Send logout request to the backend
      const response: Response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: userId,
        }),
      });

      if (response.ok) {
        // Handle successful logout
        alert(
          'You have been successfully logged out. Redirecting to Welcome Page'
        );
        navigate('/');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  // Event handlers for mouse hover text visibility on icons
  const handleMouseEnterDash = (): void => {
    setShowDashText(true);
  };

  const handleMouseLeaveDash = (): void => {
    setShowDashText(false);
  };

  const handleMouseEnterPod = (): void => {
    setShowPodText(true);
  };

  const handleMouseLeavePod = (): void => {
    setShowPodText(false);
  };

  const handleMouseEnterLogout = (): void => {
    setShowLogoutText(true);
  };

  const handleMouseLeaveLogout = (): void => {
    setShowLogoutText(false);
  };

  const handleMouseEnterTheme = (): void => {
    setShowThemeText(true);
  };

  const handleMouseLeaveTheme = (): void => {
    setShowThemeText(false);
  };

  // Function to handle dashboard toggle
  const handleDashToggle = (): void => {
    if (podClicked) {
      handlePod();
    }
    handleDashboard();
  };

  // Function to handle pod toggle
  const handlePodClicked = (): void => {
    if (dashboardClicked) {
      handleDashboard();
    }
    handlePod();
  };

  // Function to handle theme toggle
  const handleThemeToggle = (): void => {
    // Set dark mode to opposite of current mode using prevState
    setDarkMode((prevDarkMode: boolean) => !prevDarkMode);
  };

  return (
    <Box className="sidebar">
      <img id="logo" src="src/assets/logo1.png" alt="logo" />
      {/* Navigation List */}
      <List className="list">
        {/* Dashboard button */}
        <ListItemButton
          //onMouse*** is property when cursor is hovering over element
          data-testid="DashboardButton"
          onMouseEnter={handleMouseEnterDash}
          onMouseLeave={handleMouseLeaveDash}
          onClick={handleDashToggle}
        >
          <ListItemIcon className="listItemIcon">
            <DashboardIcon sx={{ fontSize: 50 }} />
          </ListItemIcon>
          <ListItemText
            // primary is the content of the ListItemText, which is a conditional in this case
            primary={showDashText ? 'Dashboard' : ''}
            className="listItemText"
            primaryTypographyProps={{ fontSize: '20px', fontWeight: 'bold' }}
          />
        </ListItemButton>
        {/* Pod button */}
        <ListItemButton
          //onMouse*** is property when cursor is hovering over element
          data-testid="PodButton"
          onMouseEnter={handleMouseEnterPod}
          onMouseLeave={handleMouseLeavePod}
          onClick={handlePodClicked}
        >
          <ListItemIcon className="listItemIcon">
            <ListAltIcon sx={{ fontSize: 50 }} />
          </ListItemIcon>
          <ListItemText
            // primary is the content of the ListItemText, which is a conditional in this case
            primary={showPodText ? 'Pods' : ''}
            className="listItemText"
            primaryTypographyProps={{ fontSize: '20px', fontWeight: 'bold' }}
          />
        </ListItemButton>
        {/* Logout button */}
        <ListItemButton
          data-testid="LogoutButton"
          onMouseEnter={handleMouseEnterLogout}
          onMouseLeave={handleMouseLeaveLogout}
          onClick={handleLogout}
        >
          <ListItemIcon className="listItemIcon">
            <LogoutIcon sx={{ fontSize: 50 }} />
          </ListItemIcon>
          <ListItemText
            primary={showLogoutText ? 'Logout' : ''}
            className="listItemText"
            primaryTypographyProps={{ fontSize: '20px', fontWeight: 'bold' }}
          />
        </ListItemButton>
        {/* Theme (Icon is conditional based on the current state)*/}
        <ListItemButton
          data-testid="ThemeButton"
          className="listItem"
          onMouseEnter={handleMouseEnterTheme}
          onMouseLeave={handleMouseLeaveTheme}
          onClick={handleThemeToggle}
        >
          <ListItemIcon>
            {darkMode ? (
              <Brightness7Icon
                sx={{ fontSize: 50 }}
                data-testid="Brightness7Icon"
              />
            ) : (
              <Brightness4Icon
                sx={{ fontSize: 50 }}
                data-testid="Brightness4Icon"
              />
            )}
          </ListItemIcon>
          <ListItemText
            primary={showThemeText ? 'Light/Dark' : ''}
            className="listItemText"
            primaryTypographyProps={{ fontSize: '20px', fontWeight: 'bold' }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;