// src/pages/cliente/MonitoreoTiempoReal.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Chip } from '@mui/material';
import Sidebar from '../../components/Layout/Sidebar';
import Topbar from '../../components/Layout/Topbar';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ScaleIcon from '@mui/icons-material/Scale';
import SensorsIcon from '@mui/icons-material/Sensors';

const MonitoreoTiempoReal = () => {
  const [datos, setDatos] = useState({
    temperatura: '--',
    humedad: '--',
    peso: '--',
    ocupado: false,
  });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch('/api/sensores/estado-actual');
        const data = await res.json();
        setDatos(data);
      } catch (error) {
        console.error('Error al obtener datos del locker:', error);
      }
    };

    obtenerDatos();
    const intervalo = setInterval(obtenerDatos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Topbar title="Monitoreo en Tiempo Real" />
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Estado del Locker
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Consulta en tiempo real los datos del locker asignado.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <ThermostatIcon fontSize="large" color="error" />
              <Typography variant="h6">Temperatura</Typography>
              <Typography>{datos.temperatura} °C</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <WaterDropIcon fontSize="large" color="primary" />
              <Typography variant="h6">Humedad</Typography>
              <Typography>{datos.humedad} %</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <ScaleIcon fontSize="large" color="secondary" />
              <Typography variant="h6">Peso</Typography>
              <Typography>{datos.peso} kg</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <SensorsIcon fontSize="large" color={datos.ocupado ? 'error' : 'success'} />
              <Typography variant="h6">Ocupación</Typography>
              <Chip label={datos.ocupado ? 'Ocupado' : 'Libre'} color={datos.ocupado ? 'error' : 'success'} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MonitoreoTiempoReal;
