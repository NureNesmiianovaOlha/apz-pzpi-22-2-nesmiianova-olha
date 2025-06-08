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
  Chip,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '@mui/icons-material/Book';

// Тимчасові дані для демонстрації
const MOCK_DATA = {
  subjects: [
    {
      id: 1,
      name: 'Математика',
      teacher: 'Петренко І.М.',
      credits: 5,
      semester: 1,
      groups: ['КН-31', 'КН-32'],
      type: 'mandatory'
    },
    {
      id: 2,
      name: 'Програмування',
      teacher: 'Коваленко О.В.',
      credits: 6,
      semester: 1,
      groups: ['КН-31'],
      type: 'mandatory'
    },
    {
      id: 3,
      name: 'Бази даних',
      teacher: 'Сидоренко М.П.',
      credits: 4,
      semester: 2,
      groups: ['КН-32', 'ІПЗ-21'],
      type: 'optional'
    }
  ],
  types: ['mandatory', 'optional'],
  semesters: [1, 2],
  groups: ['КН-31', 'КН-32', 'ІПЗ-21']
};

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState(MOCK_DATA.subjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [selectedType, setSelectedType] = useState('');

  const handleOpenDialog = (subject: any = null) => {
    setEditingSubject(subject || {
      name: '',
      teacher: '',
      credits: 0,
      semester: 1,
      groups: [],
      type: 'mandatory'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSubject(null);
  };

  const handleSaveSubject = () => {
    if (editingSubject.id) {
      setSubjects(subjects.map(subject => 
        subject.id === editingSubject.id ? editingSubject : subject
      ));
    } else {
      setSubjects([...subjects, { ...editingSubject, id: subjects.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDeleteSubject = (subjectId: number) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
  };

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = 
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || subject.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Управління предметами
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleOpenDialog()}
          startIcon={<BookIcon />}
        >
          Додати предмет
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Пошук"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Назва предмету або викладач"
          sx={{ flexGrow: 1 }}
        />
        <TextField
          select
          label="Тип предмету"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Всі типи</MenuItem>
          {MOCK_DATA.types.map((type) => (
            <MenuItem key={type} value={type}>
              {type === 'mandatory' ? "Обов'язковий" : 'За вибором'}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Назва предмету</TableCell>
              <TableCell>Викладач</TableCell>
              <TableCell>Кредити</TableCell>
              <TableCell>Семестр</TableCell>
              <TableCell>Групи</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.teacher}</TableCell>
                <TableCell>{subject.credits}</TableCell>
                <TableCell>{subject.semester}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {subject.groups.map((group) => (
                      <Chip
                        key={group}
                        label={group}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  {subject.type === 'mandatory' ? "Обов'язковий" : 'За вибором'}
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(subject)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteSubject(subject.id)}
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSubject?.id ? 'Редагувати предмет' : 'Додати предмет'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Назва предмету"
              fullWidth
              value={editingSubject?.name || ''}
              onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
            />
            <TextField
              label="Викладач"
              fullWidth
              value={editingSubject?.teacher || ''}
              onChange={(e) => setEditingSubject({ ...editingSubject, teacher: e.target.value })}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Кредити"
                type="number"
                value={editingSubject?.credits || ''}
                onChange={(e) => setEditingSubject({ ...editingSubject, credits: parseInt(e.target.value) })}
                inputProps={{ min: 1, max: 10 }}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                select
                label="Семестр"
                value={editingSubject?.semester || 1}
                onChange={(e) => setEditingSubject({ ...editingSubject, semester: parseInt(e.target.value) })}
                sx={{ flexGrow: 1 }}
              >
                {MOCK_DATA.semesters.map((semester) => (
                  <MenuItem key={semester} value={semester}>
                    {semester}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Тип"
                value={editingSubject?.type || 'mandatory'}
                onChange={(e) => setEditingSubject({ ...editingSubject, type: e.target.value })}
                sx={{ flexGrow: 1 }}
              >
                {MOCK_DATA.types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type === 'mandatory' ? "Обов'язковий" : 'За вибором'}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <TextField
              select
              label="Групи"
              value={editingSubject?.groups || []}
              onChange={(e) => setEditingSubject({ 
                ...editingSubject, 
                groups: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value 
              })}
              SelectProps={{
                multiple: true,
                renderValue: (selected: any) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: string) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                ),
              }}
              sx={{ flexGrow: 1 }}
            >
              {MOCK_DATA.groups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Скасувати</Button>
          <Button onClick={handleSaveSubject} variant="contained" color="primary">
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
                Всього предметів
              </Typography>
              <Typography variant="h4">
                {subjects.length}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Загальна кількість кредитів
              </Typography>
              <Typography variant="h4">
                {subjects.reduce((sum, subject) => sum + subject.credits, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default SubjectManagement; 