import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import { Lock as LockerIcon, Person as PersonIcon } from '@mui/icons-material';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';

const LockersPage = () => {
  // Datos simulados de lockers
  const lockerRows = [
    ['A01', 'A02', 'A03', 'A04', 'A05'],
    ['A06', 'A07', 'A08', 'A09', 'A10'],
    ['B01', 'B02', 'B03', 'B04', 'B05'],
    ['B06', 'B07', 'B08', 'B09', 'B10'],
  ];

  // Lockers asignados (simulado)
  const assignedLockers = {
    A02: 'Juan Pérez',
    A05: 'María García',
    B03: 'Carlos López',
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Topbar title="Administración de Lockers" />
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Asignación de Lockers
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Seleccione un locker para asignarlo a un usuario
          </Typography>
        </Paper>

        {lockerRows.map((row, rowIndex) => (
          <Grid container spacing={2} key={rowIndex} mb={2}>
            {row.map((locker) => {
              const isAssigned = assignedLockers[locker];
              return (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={locker}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: isAssigned ? 'secondary.light' : 'primary.light',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s',
                      },
                    }}
                  >
                    <LockerIcon fontSize="large" color={isAssigned ? 'secondary' : 'primary'} />
                    <Typography variant="h6" mt={1}>
                      {locker}
                    </Typography>
                    {isAssigned ? (
                      <Chip
                        avatar={<Avatar><PersonIcon /></Avatar>}
                        label={assignedLockers[locker]}
                        color="secondary"
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => console.log(`Asignar locker ${locker}`)}
                      >
                        Asignar
                      </Button>
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default LockersPage;