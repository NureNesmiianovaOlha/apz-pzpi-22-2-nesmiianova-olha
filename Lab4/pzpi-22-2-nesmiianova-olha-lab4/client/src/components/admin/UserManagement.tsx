import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Тимчасові дані для демонстрації
const MOCK_DATA = {
  users: [
    { id: 1, name: 'Іван Петренко', email: 'ivan@example.com', role: 'student', status: 'active' },
    { id: 2, name: 'Марія Коваленко', email: 'maria@example.com', role: 'teacher', status: 'active' },
    { id: 3, name: 'Олександр Сидоренко', email: 'alex@example.com', role: 'student', status: 'inactive' },
    { id: 4, name: 'Юлія Мороз', email: 'yulia@example.com', role: 'admin', status: 'active' }
  ],
  roles: ['student', 'teacher', 'admin'],
  statuses: ['active', 'inactive']
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(MOCK_DATA.users);
  const [selectedRole, setSelectedRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleOpenDialog = (user: any = null) => {
    setEditingUser(user || { name: '', email: '', role: 'student', status: 'active' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleSaveUser = () => {
    if (editingUser.id) {
      // Оновлення існуючого користувача
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
    } else {
      // Створення нового користувача
      setUsers([...users, { ...editingUser, id: users.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Управління користувачами
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Додати користувача
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          select
          label="Роль"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Всі ролі</MenuItem>
          {MOCK_DATA.roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role === 'student' ? 'Студент' : 
               role === 'teacher' ? 'Викладач' : 
               'Адміністратор'}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Пошук"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ім'я або email"
          sx={{ minWidth: 200 }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ім'я</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === 'student' ? 'Студент' : 
                   user.role === 'teacher' ? 'Викладач' : 
                   'Адміністратор'}
                </TableCell>
                <TableCell>
                  {user.status === 'active' ? 'Активний' : 'Неактивний'}
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(user)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteUser(user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingUser?.id ? 'Редагувати користувача' : 'Додати користувача'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Ім'я"
              fullWidth
              value={editingUser?.name || ''}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={editingUser?.email || ''}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
            <TextField
              select
              label="Роль"
              fullWidth
              value={editingUser?.role || 'student'}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            >
              {MOCK_DATA.roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === 'student' ? 'Студент' : 
                   role === 'teacher' ? 'Викладач' : 
                   'Адміністратор'}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Статус"
              fullWidth
              value={editingUser?.status || 'active'}
              onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
            >
              {MOCK_DATA.statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status === 'active' ? 'Активний' : 'Неактивний'}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Скасувати</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 