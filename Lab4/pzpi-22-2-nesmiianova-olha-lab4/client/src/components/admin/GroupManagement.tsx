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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';

// Тимчасові дані для демонстрації
const MOCK_DATA = {
  groups: [
    {
      id: 1,
      name: 'КН-31',
      curator: 'Петренко І.М.',
      studentsCount: 25,
      specialization: "Комп'ютерні науки",
      year: 3
    },
    {
      id: 2,
      name: 'КН-32',
      curator: 'Коваленко О.В.',
      studentsCount: 23,
      specialization: "Комп'ютерні науки",
      year: 3
    },
    {
      id: 3,
      name: 'ІПЗ-21',
      curator: 'Сидоренко М.П.',
      studentsCount: 27,
      specialization: 'Інженерія програмного забезпечення',
      year: 2
    }
  ]
};

const GroupManagement: React.FC = () => {
  const [groups, setGroups] = useState(MOCK_DATA.groups);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any>(null);

  const handleOpenDialog = (group: any = null) => {
    setEditingGroup(group || {
      name: '',
      curator: '',
      specialization: '',
      year: 1,
      studentsCount: 0
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingGroup(null);
  };

  const handleSaveGroup = () => {
    if (editingGroup.id) {
      setGroups(groups.map(group => 
        group.id === editingGroup.id ? editingGroup : group
      ));
    } else {
      setGroups([...groups, { ...editingGroup, id: groups.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDeleteGroup = (groupId: number) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.curator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Управління групами
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleOpenDialog()}
          startIcon={<GroupIcon />}
        >
          Додати групу
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Пошук"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Назва групи, куратор або спеціалізація"
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Назва групи</TableCell>
              <TableCell>Куратор</TableCell>
              <TableCell>Спеціалізація</TableCell>
              <TableCell>Рік навчання</TableCell>
              <TableCell>Кількість студентів</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.curator}</TableCell>
                <TableCell>{group.specialization}</TableCell>
                <TableCell>{group.year}</TableCell>
                <TableCell>{group.studentsCount}</TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(group)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteGroup(group.id)}
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
          {editingGroup?.id ? 'Редагувати групу' : 'Додати групу'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Назва групи"
              fullWidth
              value={editingGroup?.name || ''}
              onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
            />
            <TextField
              label="Куратор"
              fullWidth
              value={editingGroup?.curator || ''}
              onChange={(e) => setEditingGroup({ ...editingGroup, curator: e.target.value })}
            />
            <TextField
              label="Спеціалізація"
              fullWidth
              value={editingGroup?.specialization || ''}
              onChange={(e) => setEditingGroup({ ...editingGroup, specialization: e.target.value })}
            />
            <TextField
              label="Рік навчання"
              type="number"
              fullWidth
              value={editingGroup?.year || ''}
              onChange={(e) => setEditingGroup({ ...editingGroup, year: parseInt(e.target.value) })}
              inputProps={{ min: 1, max: 6 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Скасувати</Button>
          <Button onClick={handleSaveGroup} variant="contained" color="primary">
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>

      {/* Статистика */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Статистика
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Card sx={{ flexGrow: 1 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Всього груп
              </Typography>
              <Typography variant="h4">
                {groups.length}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Загальна кількість студентів
              </Typography>
              <Typography variant="h4">
                {groups.reduce((sum, group) => sum + group.studentsCount, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupManagement; 