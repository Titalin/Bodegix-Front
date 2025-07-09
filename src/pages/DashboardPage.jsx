import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  People as PeopleIcon,
  Lock as LockersIcon,
  Assignment as AssignmentIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';

const DashboardPage = () => {
  const stats = [
    { title: 'Usuarios', value: '24', icon: <PeopleIcon fontSize="large" /> },
    { title: 'Lockers', value: '50', icon: <LockersIcon fontSize="large" /> },
    { title: 'Asignados', value: '18', icon: <AssignmentIcon fontSize="large" /> },
    { title: 'Disponibles', value: '32', icon: <StorageIcon fontSize="large" /> },
  ];

  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Topbar title="Dashboard" />
        <Grid container spacing={3} mt={2}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  backgroundColor: index % 2 === 0 ? 'primary.light' : 'secondary.light',
                }}
              >
                <Box color="primary.main" mb={2}>
                  {stat.icon}
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1">{stat.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;