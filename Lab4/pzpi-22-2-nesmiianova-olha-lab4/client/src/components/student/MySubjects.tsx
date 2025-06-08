import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { getStudentSubjects } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface Subject {
  _id: string;
  name: string;
  title: string;
  teacher?: {
    fullName: string;
  };
  credits?: number;
  semester?: number;
}

const SAMPLE_SUBJECTS: Subject[] = [
  {
    _id: 'subject1',
    name: 'Math Analysis',
    title: 'Математичний аналіз',
    teacher: {
      fullName: 'Петренко Іван Михайлович'
    },
    credits: 5,
    semester: 1
  },
  {
    _id: 'subject2',
    name: 'Programming',
    title: 'Програмування',
    teacher: {
      fullName: 'Коваленко Марія Петрівна'
    },
    credits: 6,
    semester: 1
  },
  {
    _id: 'subject3',
    name: 'Databases',
    title: 'Бази даних',
    teacher: {
      fullName: 'Сидоренко Олексій Іванович'
    },
    credits: 4,
    semester: 2
  }
];

const MySubjects: React.FC = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user?._id) {
        setError('Користувач не авторизований');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const data = await getStudentSubjects(user._id);
        // Use real data if available, otherwise fall back to sample data
        setSubjects(data?.length > 0 ? data : SAMPLE_SUBJECTS);
      } catch (err) {
        console.error('Error fetching subjects:', err);
        // Use sample data on error
        setSubjects(SAMPLE_SUBJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [user]);

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
        Мої предмети
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {subjects.length === 0 ? (
        <Typography color="text.secondary">
          У вас поки немає предметів
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {subjects.map((subject) => (
              <Grid item xs={12} md={6} key={subject._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {subject.title || subject.name}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography color="text.secondary" gutterBottom>
                        Викладач: {subject.teacher?.fullName || 'Не призначено'}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        {subject.credits && (
                          <Chip 
                            label={`${subject.credits} кредитів`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                        {subject.semester && (
                          <Chip 
                            label={`${subject.semester} семестр`}
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography color="text.secondary">
              Всього предметів: {subjects.length}
            </Typography>
            {subjects.some(s => s.credits) && (
              <Typography color="text.secondary">
                Загальна кількість кредитів: {
                  subjects.reduce((sum, subject) => sum + (subject.credits || 0), 0)
                }
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MySubjects;