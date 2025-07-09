// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import LockersPage from './pages/LockersPage';

// Nuevas páginas
import Reports from './pages/Reports';
import AminsrarSuscripciones from './pages/AdministrarSuscripciones';
import RegistroUsuario from './pages/RegistroUsuario';
import MonitoreoTiempoReal from './pages/MonitoreoTiempoReal';
import VisualizacionFraficas from './pages/VisualizacionGraficas';

import { AuthProvider, AuthContext } from './context/AuthContext';

// Ruta protegida
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
            <Route path="/lockers" element={<PrivateRoute><LockersPage /></PrivateRoute>} />

            {/* Nuevas rutas */}
            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
            <Route path="/suscripciones" element={<PrivateRoute><AminsrarSuscripciones /></PrivateRoute>} />
            <Route path="/registro" element={<PrivateRoute><RegistroUsuario /></PrivateRoute>} />
            <Route path="/monitoreo" element={<PrivateRoute><MonitoreoTiempoReal /></PrivateRoute>} />
            <Route path="/graficas" element={<PrivateRoute><VisualizacionFraficas /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
