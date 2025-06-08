import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import SubjectList from '../components/teacher/SubjectList';
import StudentList from '../components/teacher/StudentList';
import StudentGrades from '../components/teacher/StudentGrades';
import { getTeacherSubjects } from '../services/api';

interface Subject {
  _id: string;
  title: string;
  description?: string;
}

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (user?._id) {
          const data = await getTeacherSubjects(user._id);
          setSubjects(data);
        }
      } catch (err) {
        setError('Помилка при завантаженні предметів');
        console.error('Error fetching subjects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [user]);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Панель викладача
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Мої предмети
            </Typography>
            <SubjectList 
              subjects={subjects}
              selectedSubject={selectedSubject}
              onSubjectSelect={handleSubjectSelect}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          {selectedSubject ? (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Студенти та оцінки: {selectedSubject.title}
              </Typography>
              <StudentGrades subjectId={selectedSubject._id} />
            </Paper>
          ) : (
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                Виберіть предмет для перегляду студентів та оцінок
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard; 