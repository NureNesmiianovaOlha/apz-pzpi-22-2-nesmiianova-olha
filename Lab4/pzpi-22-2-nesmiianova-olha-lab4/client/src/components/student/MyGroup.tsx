import React from 'react';
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
  Card,
  CardContent
} from '@mui/material';

// Тимчасові дані для демонстрації
const MOCK_DATA = {
  group: {
    name: 'КН-31',
    curator: 'Петренко Іван Михайлович',
    students: [
      { id: 1, name: 'Іван Петренко', email: 'ivan@example.com' },
      { id: 2, name: 'Марія Коваленко', email: 'maria@example.com' },
      { id: 3, name: 'Олександр Сидоренко', email: 'alex@example.com' },
      { id: 4, name: 'Юлія Мороз', email: 'yulia@example.com' }
    ]
  }
};

const MyGroup: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Моя група
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Інформація про групу
          </Typography>
          <Typography>
            <strong>Назва групи:</strong> {MOCK_DATA.group.name}
          </Typography>
          <Typography>
            <strong>Куратор:</strong> {MOCK_DATA.group.curator}
          </Typography>
          <Typography>
            <strong>Кількість студентів:</strong> {MOCK_DATA.group.students.length}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Список студентів групи
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Ім'я</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_DATA.group.students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyGroup; 