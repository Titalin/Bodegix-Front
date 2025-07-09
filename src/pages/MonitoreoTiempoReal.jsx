import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const generateSimulatedData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: `${i}:00`,
      temperatura: 20 + Math.random() * 5,
      humedad: 40 + Math.random() * 20,
      ocupados: 5 + Math.floor(Math.random() * 10),
    });
  }
  return data;
};

const MonitoreoTiempoReal = () => {
  const [datos, setDatos] = useState(generateSimulatedData());

  useEffect(() => {
    const interval = setInterval(() => {
      setDatos((prev) => [
        ...prev.slice(1),
        {
          time: `${new Date().getMinutes()}:${new Date().getSeconds()}`,
          temperatura: 20 + Math.random() * 5,
          humedad: 40 + Math.random() * 20,
          ocupados: 5 + Math.floor(Math.random() * 10),
        },
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Topbar title="Monitoreo en Tiempo Real" />
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Estado en vivo de lockers y sensores
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Datos simulados de temperatura, humedad y ocupación de lockers en tiempo real.
          </Typography>
        </Paper>

        <Box mb={2}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Temperatura (°C) y Humedad (%)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperatura" stroke="#FF5722" name="Temperatura" strokeWidth={1} />
                <Line type="monotone" dataKey="humedad" stroke="#2196F3" name="Humedad" strokeWidth={1} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        <Box>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Lockers Ocupados en Tiempo Real
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ocupados" stroke="#4CAF50" name="Lockers Ocupados" strokeWidth={1} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default MonitoreoTiempoReal;
