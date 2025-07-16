// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    ExitToApp as LogoutIcon,
    InsertChart as ReportIcon,
    PersonAdd as RegisterIcon,
    Visibility as MonitorIcon,
    ShowChart as ChartIcon,
} from '@mui/icons-material';
import Logo from '../common/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, logout } = React.useContext(AuthContext);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        try {
            // Llamar al backend para cerrar sesión
            const response = await fetch('http://localhost:5000/api/usuarios/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error('Error al cerrar sesión en backend');
            }
        } catch (error) {
            console.error('Error al comunicarse con backend para logout:', error);
        }

        // Luego limpia el token local y el estado de contexto
        localStorage.removeItem('token');
        logout();
        navigate('/login');
    };

    // Determina roles
    const isSuperAdmin = user?.rol_id === 1;
    const isAdminEmpresa = user?.rol_id === 2;

    // Menú para SuperAdmin
    const superAdminMenuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { text: 'Usuarios', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Reportes', icon: <ReportIcon />, path: '/admin/reports' },
        { text: 'Registrar Empresa', icon: <RegisterIcon />, path: '/admin/register-company' },
        { text: 'Gráficas', icon: <ChartIcon />, path: '/admin/charts' },
        { text: 'Configuración', icon: <SettingsIcon />, path: '/admin/settings' }
    ];

    // Menú para Admin Empresa (más reducido o distinto)
    const adminEmpresaMenuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { text: 'Usuarios', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Reportes', icon: <ReportIcon />, path: '/admin/reports' },
        // Admin empresa no puede registrar empresas ni ver gráficas generales, por ejemplo
        { text: 'Configuración', icon: <SettingsIcon />, path: '/admin/settings' }
    ];

    // Menú para clientes normales
    const clienteMenuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/cliente/dashboard' },
        { text: 'Monitoreo Tiempo Real', icon: <MonitorIcon />, path: '/cliente/monitoreo' },
    ];

    // Selección menú según rol
    let menuItems = clienteMenuItems;
    if (isSuperAdmin) {
        menuItems = superAdminMenuItems;
    } else if (isAdminEmpresa) {
        menuItems = adminEmpresaMenuItems;
    }

    // Cambiar color de fondo según rol para dar más feedback visual
    let drawerBgColor = '#37474f'; // cliente
    if (isSuperAdmin) drawerBgColor = '#1a2540'; // azul oscuro para superadmin
    else if (isAdminEmpresa) drawerBgColor = '#263238'; // gris oscuro para admin empresa

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: drawerBgColor,
                    color: '#ffffff',
                },
            }}
        >
            <Logo />
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                        <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon sx={{ color: '#ffffff' }}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Cerrar Sesión" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
