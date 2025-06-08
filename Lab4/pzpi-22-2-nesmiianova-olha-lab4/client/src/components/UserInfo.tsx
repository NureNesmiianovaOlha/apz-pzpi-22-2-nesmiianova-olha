import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserInfo: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated || !user) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={() => navigate('/login')}>
          Увійти
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.paper' }}>
      <Box>
        <Typography variant="subtitle1">
          Ви увійшли як: {user.role}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.fullName} ({user.email})
        </Typography>
      </Box>
      <Button variant="outlined" color="primary" onClick={handleLogout}>
        Вийти
      </Button>
    </Box>
  );
};

export default UserInfo; 