import { ReactElement, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import '../css/Sidebar.css';
import { SidebarProps } from '../../types';


const Sidebar = ({ darkMode, dashboardClicked, podClicked, handleDashboard, handlePod, setDarkMode }: SidebarProps): ReactElement => {
  const [showLogoutText, setShowLogoutText] = useState<boolean>(false);
  const [showThemeText, setShowThemeText] = useState<boolean>(false);
  const [showDashText, setShowDashText] = useState<boolean>(false);
  const [showPodText, setShowPodText] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  /*
  when logout button is clicked, send POST to backend with userId as body,
  if response is ok, alert user logged out and redirect them to homepage.
  */
  const handleLogout = async (): Promise<void> => {
    try {
      const response: Response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({}),
      });
      if (response.ok) {
        alert(
          'You have been successfully logged out. Redirecting to Welcome Page'
        );
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleDashToggle = (): void => {
  // when handleDashToggle is called, check if podClicked is truthy, if so call handlePod to turn off pod
    if (podClicked) {
      handlePod();
    }
    handleDashboard();
  };

  const handlePodClicked = (): void => {
    // when handePodClicked is called, check if dashboardClicked is truthy, if so call handleDashboard to turn off dashboard
    if (dashboardClicked) {
      handleDashboard();
    }
    handlePod();
  };

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
            primary={showThemeText ? 'Dark/Light' : ''}
            className="listItemText"
            primaryTypographyProps={{ fontSize: '20px', fontWeight: 'bold' }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;