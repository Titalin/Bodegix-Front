// src/components/Layout/Sidebar.jsx

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Lock as LockersIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  InsertChart as ReportIcon,
  Subscriptions as SubscriptionsIcon,
  PersonAdd as RegisterIcon,
  Visibility as MonitorIcon,
  ShowChart as ChartIcon,
} from '@mui/icons-material';
import Logo from '../common/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon color="primary" />, path: '/dashboard' },
    { text: 'Usuarios', icon: <PeopleIcon color="primary" />, path: '/users' },
    { text: 'Lockers', icon: <LockersIcon color="primary" />, path: '/lockers' },
    { text: 'Reportes', icon: <ReportIcon color="primary" />, path: '/reports' },
    { text: 'Suscripciones', icon: <SubscriptionsIcon color="primary" />, path: '/suscripciones' },
    { text: 'Registrar Empresa', icon: <RegisterIcon color="primary" />, path: '/registro' },
    { text: 'Monitoreo Tiempo Real', icon: <MonitorIcon color="primary" />, path: '/monitoreo' },
    { text: 'Gráficas', icon: <ChartIcon color="primary" />, path: '/graficas' },
    { text: 'Configuración', icon: <SettingsIcon color="primary" />, path: '/settings' }, // opcional
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1a2540', // azul marino más oscuro
          color: '#ffffff',
        },
      }}
    >
      <Logo />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: '#ffffff' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
