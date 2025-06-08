import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginTeacher, loginStudent, loginAdmin } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let response;
      switch (role) {
        case 'teacher':
          response = await loginTeacher(email, password);
          break;
        case 'student':
          response = await loginStudent(email, password);
          break;
        case 'admin':
          response = await loginAdmin(email, password);
          break;
        default:
          throw new Error('Invalid role');
      }

      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);

        switch (role) {
          case 'teacher':
            navigate('/teacher');
            break;
          case 'student':
            navigate('/student');
            break;
          case 'admin':
            navigate('/admin');
            break;
        }
      } else {
        setError('Помилка авторизації: відсутній токен');
      }
    } catch (err) {
      setError('Невірний email або пароль');
      console.error('Login error:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Вхід в систему
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Роль</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Роль"
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <MenuItem value="student">Студент</MenuItem>
                <MenuItem value="teacher">Викладач</MenuItem>
                <MenuItem value="admin">Адміністратор</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
            >
              Увійти
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 