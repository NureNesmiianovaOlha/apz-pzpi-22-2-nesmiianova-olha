import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  return (
    <Box sx={{ 
      textAlign: 'center', 
      mt: 4,
      p: 3
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Система контролю успішності
      </Typography>
      
      {userRole ? (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Ви увійшли як: {userRole}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2 }}
          >
            Перейти до панелі управління
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Ласкаво просимо до системи контролю успішності.
            Будь ласка, увійдіть в систему для доступу до функціоналу відповідно до вашої ролі.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Увійти
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home; 