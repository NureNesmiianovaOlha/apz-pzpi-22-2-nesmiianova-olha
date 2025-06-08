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
  Box,
  MenuItem,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material';
import { getStudentGrades, getSubjects, Grade, Subject } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface GradeWithDetails extends Grade {
  subjectDetails?: Subject;
}

const StudentGrades: React.FC = () => {
  const { user } = useAuth();
  const [grades, setGrades] = useState<GradeWithDetails[]>([
    {
      _id: '1',
      studentId: 'student1',
      subjectId: 'subject1',
      gradeValue: 85,
      date: '2024-03-20',
      subjectDetails: {
        _id: 'subject1',
        title: 'Математичний аналіз',
        name: 'Math Analysis',
        description: 'Основи математичного аналізу'
      }
    },
    {
      _id: '2',
      studentId: 'student1',
      subjectId: 'subject2',
      gradeValue: 92,
      date: '2024-03-19',
      subjectDetails: {
        _id: 'subject2',
        title: 'Програмування',
        name: 'Programming',
        description: 'Основи програмування'
      }
    },
    {
      _id: '3',
      studentId: 'student1',
      subjectId: 'subject3',
      gradeValue: 78,
      date: '2024-03-18',
      subjectDetails: {
        _id: 'subject3',
        title: 'Бази даних',
        name: 'Databases',
        description: 'Основи баз даних'
      }
    }
  ]);
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      _id: 'subject1',
      title: 'Математичний аналіз',
      name: 'Math Analysis',
      description: 'Основи математичного аналізу'
    },
    {
      _id: 'subject2',
      title: 'Програмування',
      name: 'Programming',
      description: 'Основи програмування'
    },
    {
      _id: 'subject3',
      title: 'Бази даних',
      name: 'Databases',
      description: 'Основи баз даних'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const filteredGrades = selectedSubject
    ? grades.filter(grade => grade.subjectDetails?._id === selectedSubject)
    : grades;

  const getSubjectName = (subject?: Subject) => {
    return subject?.title || subject?.name || 'Невідомий предмет';
  };

  const getGradeValue = (grade: Grade): number => {
    return grade.gradeValue || 0;
  };

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
        Мої оцінки
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <TextField
          select
          label="Фільтр за предметом"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Всі предмети</MenuItem>
          {subjects.map((subject) => (
            <MenuItem key={subject._id} value={subject._id}>
              {getSubjectName(subject)}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Предмет</TableCell>
              <TableCell>Оцінка</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGrades.map((grade) => (
              <TableRow key={grade._id}>
                <TableCell>{getSubjectName(grade.subjectDetails)}</TableCell>
                <TableCell>{getGradeValue(grade)}</TableCell>
                <TableCell>
                  {new Date(grade.date).toLocaleDateString('uk-UA')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredGrades.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography color="text.secondary">
            Середній бал: {
              (filteredGrades.reduce((sum, grade) => sum + getGradeValue(grade), 0) / filteredGrades.length).toFixed(2)
            }
          </Typography>
        </Box>
      )}

      {filteredGrades.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Немає оцінок для відображення
        </Typography>
      )}
    </Box>
  );
};

export default StudentGrades; 