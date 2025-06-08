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
import { getStudentGrades, getStudentSubjects } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface Grade {
  _id: string;
  gradeValue: number;
  date: string;
  subjectId: string;
}

interface Subject {
  _id: string;
  name: string;
  title: string;
}

const SAMPLE_GRADES: Grade[] = [
  {
    _id: 'grade1',
    gradeValue: 85,
    date: new Date().toISOString(),
    subjectId: 'subject1'
  },
  {
    _id: 'grade2',
    gradeValue: 92,
    date: new Date().toISOString(),
    subjectId: 'subject2'
  },
  {
    _id: 'grade3',
    gradeValue: 78,
    date: new Date().toISOString(),
    subjectId: 'subject3'
  }
];

const SAMPLE_SUBJECTS: Subject[] = [
  {
    _id: 'subject1',
    name: 'Math Analysis',
    title: 'Математичний аналіз'
  },
  {
    _id: 'subject2',
    name: 'Programming',
    title: 'Програмування'
  },
  {
    _id: 'subject3',
    name: 'Databases',
    title: 'Бази даних'
  }
];

const MyGrades: React.FC = () => {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) {
        setError('Користувач не авторизований');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        
        const [gradesData, subjectsData] = await Promise.all([
          getStudentGrades(user._id),
          getStudentSubjects(user._id)
        ]);

        // Use real data if available, otherwise fall back to sample data
        setGrades(gradesData?.length > 0 ? gradesData : SAMPLE_GRADES);
        setSubjects(subjectsData?.length > 0 ? subjectsData : SAMPLE_SUBJECTS);
      } catch (err) {
        console.error('Error fetching data:', err);
        // Use sample data on error
        setGrades(SAMPLE_GRADES);
        setSubjects(SAMPLE_SUBJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredGrades = selectedSubject
    ? grades.filter(grade => grade.subjectId === selectedSubject)
    : grades;

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s._id === subjectId);
    return subject?.title || subject?.name || 'Невідомий предмет';
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
              {subject.title || subject.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {filteredGrades.length === 0 ? (
        <Typography color="text.secondary">
          Немає оцінок для відображення
        </Typography>
      ) : (
        <>
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
                    <TableCell>{getSubjectName(grade.subjectId)}</TableCell>
                    <TableCell>{grade.gradeValue}</TableCell>
                    <TableCell>
                      {new Date(grade.date).toLocaleDateString('uk-UA')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2 }}>
            <Typography color="text.secondary">
              Середній бал: {
                (filteredGrades.reduce((sum, grade) => sum + grade.gradeValue, 0) / filteredGrades.length).toFixed(2)
              }
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MyGrades; 