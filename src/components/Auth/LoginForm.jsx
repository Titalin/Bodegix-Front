import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().required('Requerido'),
    }),
    onSubmit: (values) => {
      setLoginError('');
      const success = login(values.email, values.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setLoginError('Credenciales incorrectas');
      }
    },
  });

  return (
    <Paper elevation={0} sx={{ p: 2, background: 'transparent' }}>
      <form onSubmit={formik.handleSubmit}>
        <Box mb={3}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {loginError && (
          <Typography color="error" align="center" mb={2}>
            {loginError}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
        >
          Iniciar Sesión
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
