import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import Logo from '../components/common/Logo';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, boxShadow: 4, textAlign: 'center' }}>
          <Logo />
          <Typography variant="h5" mt={2} mb={2} color="text.primary">
            Inicio de Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Ingresa tus credenciales para acceder al sistema de lockers inteligentes.
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
