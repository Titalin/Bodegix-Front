import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar } from '@mui/material';
import {
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const Topbar = ({ title }) => {
  const { user } = React.useContext(AuthContext);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#2d3e63', // Azul ligeramente más claro
        color: '#fff',               // Texto blanco
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar sx={{ bgcolor: 'secondary.main', ml: 2 }}>
          {user?.email.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          {user?.email}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
