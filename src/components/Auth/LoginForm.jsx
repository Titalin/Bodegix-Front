// src/components/Auth/LoginForm.jsx

import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [error, setError] = useState('');

  const toggleMostrarContraseña = () => {
    setMostrarContraseña((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await response.json();
      console.log('[LoginForm] Respuesta login:', data);

      if (!response.ok) {
        setError(data.message || 'Credenciales incorrectas.');
        return;
      }

      if (data.usuario && data.usuario.token) {
        const token = data.usuario.token;
        login(token);

        const decoded = jwtDecode(token);
        console.log('[LoginForm] Token decodificado:', decoded);

        if (decoded.rol === 'superadmin' || decoded.rol_id === 1) {
          navigate('/admin/dashboard');
        } else if (decoded.rol === 'cliente' || decoded.rol_id === 2) {
          navigate('/cliente/dashboard');
        } else {
          setError('Rol no autorizado para ingresar.');
        }
      } else {
        setError('No se recibió token en la respuesta.');
      }
    } catch (err) {
      console.error('[LoginForm] Error en login:', err);
      setError('Error de conexión al servidor.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Correo electrónico"
            fullWidth
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Contraseña"
            fullWidth
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            type={mostrarContraseña ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleMostrarContraseña} edge="end">
                    {mostrarContraseña ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth size="large">
          Iniciar Sesión
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
