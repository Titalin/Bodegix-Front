import React from 'react';
import { Box, Typography, Paper, Grid, Chip, Divider } from '@mui/material';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const empresasSimuladas = [
  { nombre: 'Empresa Alpha', estado: 'Activa', plan: 'Premium', inicio: '2024-01-15' },
  { nombre: 'Empresa Beta', estado: 'Inactiva', plan: 'Básico', inicio: '2023-09-01' },
  { nombre: 'Empresa Gamma', estado: 'Pronto a Vencer', plan: 'Pro', inicio: '2024-03-10' },
  { nombre: 'Empresa Delta', estado: 'Activa', plan: 'Básico', inicio: '2024-05-05' },
];

const getStatusIcon = (estado) => {
  if (estado === 'Activa') return <CheckCircleIcon color="success" fontSize="large" />;
  if (estado === 'Inactiva') return <HighlightOffIcon color="error" fontSize="large" />;
  return <WarningIcon color="warning" fontSize="large" />;
};

const VisualizacionGraficas = () => {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Topbar title="Empresas Simuladas" />
        <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Visualización de Empresas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Panel de empresas con detalles de estado, tipo de plan, fecha de inicio y visuales claros para gestión y monitoreo.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {empresasSimuladas.map((empresa, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                {getStatusIcon(empresa.estado)}
                <Typography variant="h6" mt={1} gutterBottom>
                  {empresa.nombre}
                </Typography>
                <Chip label={empresa.estado} color={empresa.estado === 'Activa' ? 'success' : empresa.estado === 'Inactiva' ? 'error' : 'warning'} sx={{ mb: 1 }} />
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" gutterBottom>
                  <BusinessIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Plan: {empresa.plan}
                </Typography>
                <Typography variant="body2">
                  <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Inicio: {empresa.inicio}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default VisualizacionGraficas;