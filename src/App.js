// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import DashboardCliente from './pages/cliente/DashboardCliente';
import UsersPage from './pages/admin/UsersPage';
import Reports from './pages/admin/Reports';
import RegistroEmpresas from './pages/admin/RegistroEmpresas';
import VisualizacionGraficas from './pages/admin/VisualizacionGraficas';
import MonitoreoTiempoReal from './pages/cliente/MonitoreoTiempoReal';
import SettingsPage from './pages/admin/SettingsPage';

import ProtectedRoute from './components/Auth/ProtectedRoute';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute rolesAllowed={['superadmin', 1]}>
                <DashboardAdmin />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute rolesAllowed={['superadmin', 1]}>
                <UsersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute rolesAllowed={['superadmin', 1]}>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/admin/register-company" element={
              <ProtectedRoute rolesAllowed={['superadmin', 1]}>
                <RegistroEmpresas />
              </ProtectedRoute>
            } />
            <Route path="/admin/charts" element={
              <ProtectedRoute rolesAllowed={['superadmin', 1]}>
                <VisualizacionGraficas />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute rolesAllowed={['superadmin', 1]}>
                <SettingsPage />
              </ProtectedRoute>
            } />

            {/* Cliente */}
            <Route path="/cliente/dashboard" element={
              <ProtectedRoute rolesAllowed={['cliente', 2]}>
                <DashboardCliente />
              </ProtectedRoute>
            } />
            <Route path="/cliente/monitoreo" element={
              <ProtectedRoute rolesAllowed={['cliente', 2]}>
                <MonitoreoTiempoReal />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
