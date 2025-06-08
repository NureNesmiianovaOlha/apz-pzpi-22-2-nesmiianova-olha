import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Box,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import { getStudents } from '../../services/api';

interface Student {
  _id: string;
  fullName: string;
  email: string;
  group?: {
    _id: string;
    name: string;
  };
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError('Помилка при завантаженні списку студентів');
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Get unique groups from students
  const groups = Array.from(new Set(students.map(student => student.group?.name).filter(Boolean)));

  const filteredStudents = students.filter(student => {
    const matchesGroup = !selectedGroup || student.group?.name === selectedGroup;
    const matchesSearch = 
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Список студентів
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Фільтри */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          select
          label="Група"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Всі групи</MenuItem>
          {groups.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
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

      {/* Таблиця студентів */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ім'я</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Група</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.group?.name || 'Не призначено'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Інформація про кількість студентів */}
      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
        Знайдено студентів: {filteredStudents.length}
      </Typography>
    </Box>
  );
};

export default StudentList; 