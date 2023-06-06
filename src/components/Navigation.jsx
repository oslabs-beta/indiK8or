
//this is app bar
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import GridViewIcon from '@mui/icons-material/GridView';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const drawerWidth = 175;

export default function Navigation() {

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* add our logo here */}
        <Toolbar />
        <Divider />
        <List > 
           <ListItem key='navigation' disablePadding >
              <ListItemButton>
                <ListItemIcon >
                  <GridViewIcon 
                  sx={{ fontSize: 40 }} 
                  color="primary"
                   /> 
                <ListItemText  
                primaryTypographyProps={{fontSize: '22px'}} 
                primary="Dashboard" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            {/* <ListItem key='darkMode' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DarkModeIcon fontSize='large' /> 
                </ListItemIcon>
              </ListItemButton>
            </ListItem> */}

            <ListItem key='logOut' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon  sx={{ fontSize: 40 }} color="primary" /> 
                  <ListItemText  
                primaryTypographyProps={{fontSize: '22px'}} 
                primary="Log Out" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, textAlign: 'center', bgcolor: 'background.default', p: 5 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}



