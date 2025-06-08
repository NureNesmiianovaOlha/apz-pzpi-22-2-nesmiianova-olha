import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import UserInfo from './components/UserInfo';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <UserInfo />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/teacher" element={<Dashboard />} />
            <Route path="/student" element={<Dashboard />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
