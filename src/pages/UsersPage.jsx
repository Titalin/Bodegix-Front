import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';

const UsersPage = () => {
  // Datos simulados
  const users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', locker: 'A12', status: 'Activo' },
    { id: 2, name: 'María García', email: 'maria@example.com', locker: 'B05', status: 'Activo' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', locker: null, status: 'Inactivo' },
  ];

  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Topbar title="Administración de Usuarios" />
        <Box display="flex" justifyContent="space-between" mb={3}>
          <TextField
            variant="outlined"
            placeholder="Buscar usuarios..."
            InputProps={{
              startAdornment: <SearchIcon color="action" />,
            }}
            size="small"
          />
          <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
            Nuevo Usuario
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Locker</TableCell>
                <TableCell sx={{ color: 'white' }}>Estado</TableCell>
                <TableCell sx={{ color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.locker || (
                      <Button variant="outlined" size="small" color="secondary">
                        Asignar
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box
                      display="inline-block"
                      px={1.5}
                      py={0.5}
                      borderRadius={1}
                      bgcolor={user.status === 'Activo' ? 'success.light' : 'error.light'}
                      color={user.status === 'Activo' ? 'success.dark' : 'error.dark'}
                    >
                      {user.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button size="small" color="primary">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UsersPage;