// src/pages/cliente/LockersPage.jsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Divider,
  TextField,
} from '@mui/material';
import {
  Lock as LockerIcon,
  Person as PersonIcon,
  PowerSettingsNew as EstadoIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import Sidebar from '../../components/Layout/Sidebar';
import Topbar from '../../components/Layout/Topbar';
import { jwtDecode } from 'jwt-decode';

const LockersPage = () => {
  const [lockers, setLockers] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [token, setToken] = useState('');
  const [empresaId, setEmpresaId] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;
    const decoded = jwtDecode(storedToken);
    setEmpresaId(decoded.empresa_id);
    setToken(storedToken);
  }, []);

  const fetchLockers = async () => {
    try {
      const res = await fetch(`/api/lockers?empresa_id=${empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLockers(data);
    } catch (error) {
      console.error('Error al obtener lockers:', error);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const res = await fetch(`/api/usuarios?rol_id=3`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  useEffect(() => {
    if (empresaId && token) {
      fetchLockers();
      fetchEmpleados();
    }
  }, [empresaId, token]);

  const handleUpdateLocker = async (lockerId, values) => {
    try {
      const res = await fetch(`/api/lockers/${lockerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Error al actualizar locker');
      fetchLockers();
    } catch (error) {
      console.error('Error al actualizar locker:', error);
    }
  };

  const handleChange = (lockerId, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [lockerId]: {
        ...prev[lockerId],
        [field]: value,
      },
    }));
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'frios': return 'info';
      case 'perecederos': return 'warning';
      case 'no_perecederos': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Topbar title="Gestión de Lockers" />
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Lockers por Empresa</Typography>
          <Typography variant="body2" color="text.secondary">
            Edita, asigna y administra los lockers.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {lockers.map((locker) => {
            const isActivo = locker.estado === 'activo';
            const edit = editValues[locker.id] || {};

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={locker.id}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: isActivo ? '#f1f8e9' : '#ffebee',
                    border: `2px solid ${isActivo ? '#43a047' : '#e53935'}`,
                    boxShadow: 4,
                  }}
                >
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LockerIcon color={isActivo ? 'success' : 'error'} />
                      <TextField
                        size="small"
                        label="Identificador"
                        fullWidth
                        value={edit.identificador ?? locker.identificador}
                        onChange={(e) => handleChange(locker.id, 'identificador', e.target.value)}
                      />
                    </Stack>
                    <TextField
                      size="small"
                      label="Ubicación"
                      fullWidth
                      value={edit.ubicacion ?? locker.ubicacion}
                      onChange={(e) => handleChange(locker.id, 'ubicacion', e.target.value)}
                    />
                    <FormControl size="small" fullWidth>
                      <InputLabel>Tipo</InputLabel>
                      <Select
                        value={edit.tipo ?? locker.tipo}
                        label="Tipo"
                        onChange={(e) => handleChange(locker.id, 'tipo', e.target.value)}
                      >
                        <MenuItem value="frios">Fríos</MenuItem>
                        <MenuItem value="perecederos">Perecederos</MenuItem>
                        <MenuItem value="no_perecederos">No Perecederos</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth>
  <InputLabel>Empleado</InputLabel>
  <Select
    value={edit.usuario_id !== undefined ? edit.usuario_id : locker.usuario_id ?? ''}
    label="Empleado"
    onChange={(e) => handleChange(locker.id, 'usuario_id', e.target.value === '' ? null : e.target.value)}
  >
    <MenuItem value="">
      <em>Sin asignar</em>
    </MenuItem>
    {empleados
      .filter((emp) => emp.rol_id === 3 && emp.empresa_id === empresaId)
      .map((emp) => (
        <MenuItem key={emp.id} value={emp.id}>
          {emp.nombre}
        </MenuItem>
      ))}
  </Select>
</FormControl>




                    {locker.usuario?.nombre && (
                      <Chip
                        avatar={<Avatar><PersonIcon /></Avatar>}
                        label={`Asignado: ${locker.usuario.nombre}`}
                        color="secondary"
                        sx={{ mt: 1 }}
                      />
                    )}

                    <Stack direction="row" spacing={1}>
                      <Button
                        startIcon={<EstadoIcon />}
                        variant="contained"
                        color={isActivo ? 'error' : 'success'}
                        onClick={() => handleUpdateLocker(locker.id, {
                          estado: isActivo ? 'inactivo' : 'activo'
                        })}
                      >
                        {isActivo ? 'Desactivar' : 'Activar'}
                      </Button>

                      <Button
  startIcon={<EditIcon />}
  variant="outlined"
  onClick={() => {
    const updatedUsuarioId =
      edit.usuario_id !== undefined ? edit.usuario_id : locker.usuario_id ?? null;
    const valuesToUpdate = {
      identificador: edit.identificador ?? locker.identificador,
      ubicacion: edit.ubicacion ?? locker.ubicacion,
      tipo: edit.tipo ?? locker.tipo,
      usuario_id: updatedUsuarioId,
    };

    // Si no hay usuario asignado, también desactiva el locker
    if (updatedUsuarioId === null) {
      valuesToUpdate.estado = 'inactivo';
    }

    handleUpdateLocker(locker.id, valuesToUpdate);
  }}
>
  Guardar cambios
</Button>


                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default LockersPage;
