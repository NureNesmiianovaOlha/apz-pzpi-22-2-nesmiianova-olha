import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert
} from '@mui/material';

interface StudentActivity {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  type: 'attendance' | 'temperature' | 'humidity';
  value: boolean | number;
  timestamp: string;
  deviceId: {
    _id: string;
    name: string;
    location: string;
  };
}

interface ActivityStats {
  totalStudents: number;
  presentStudents: number;
  attendanceRate: number;
  avgTemperature: number;
  avgHumidity: number;
  lastUpdated: string;
}

const StudentActivityMonitor: React.FC = () => {
  const [activities, setActivities] = useState<StudentActivity[]>([]);
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState<string>('attendance');
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const fetchActivityData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Тут буде виклик API для отримання даних активності
      // const data = await iotApi.getStudentActivity({
      //   type: selectedType,
      //   startDate: startDate,
      //   endDate: endDate
      // });
      
      // Тимчасові дані для демонстрації
      const mockData: StudentActivity[] = [
        {
          _id: '1',
          student: {
            _id: '1',
            name: 'Анастасія Койнаш',
            email: 'anastas@gmail.com'
          },
          type: 'attendance',
          value: true,
          timestamp: new Date().toISOString(),
          deviceId: {
            _id: '1',
            name: 'RFID Reader Room 101',
            location: 'Аудиторія 101'
          }
        },
        {
          _id: '2',
          student: {
            _id: '2',
            name: 'Іван Петренко',
            email: 'ivan@gmail.com'
          },
          type: 'attendance',
          value: true,
          timestamp: new Date(Date.now() - 300000).toISOString(),
          deviceId: {
            _id: '1',
            name: 'RFID Reader Room 101',
            location: 'Аудиторія 101'
          }
        },
        {
          _id: '3',
          student: {
            _id: '3',
            name: 'Марія Сидорук',
            email: 'maria@gmail.com'
          },
          type: 'temperature',
          value: 22.5,
          timestamp: new Date(Date.now() - 600000).toISOString(),
          deviceId: {
            _id: '2',
            name: 'Temperature Sensor Lab A',
            location: 'Лабораторія А'
          }
        }
      ];
      
      const mockStats: ActivityStats = {
        totalStudents: 25,
        presentStudents: 23,
        attendanceRate: 92,
        avgTemperature: 22.5,
        avgHumidity: 45,
        lastUpdated: new Date().toISOString()
      };
      
      setActivities(mockData);
      setStats(mockStats);
    } catch (err) {
      setError('Помилка при завантаженні даних активності');
      console.error('Error fetching activity data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityData();
  }, [selectedType, startDate, endDate]);

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'attendance':
        return 'Відвідуваність';
      case 'temperature':
        return 'Температура';
      case 'humidity':
        return 'Вологість';
      default:
        return type;
    }
  };

  const getAttendanceColor = (value: boolean) => {
    return value ? 'success' : 'error';
  };

  const getAttendanceText = (value: boolean) => {
    return value ? 'Присутній' : 'Відсутній';
  };

  const formatValue = (activity: StudentActivity) => {
    switch (activity.type) {
      case 'attendance':
        return (
          <Chip
            label={getAttendanceText(activity.value as boolean)}
            color={getAttendanceColor(activity.value as boolean)}
            size="small"
          />
        );
      case 'temperature':
        return `${activity.value}°C`;
      case 'humidity':
        return `${activity.value}%`;
      default:
        return String(activity.value);
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Моніторинг активності студентів через IoT
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Автоматичне відстеження відвідуваності, умов навчання та активності студентів
      </Typography>

      {/* Статистика */}
      {stats && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {stats.presentStudents}/{stats.totalStudents}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Присутні студенти
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="success.main">
                  {stats.attendanceRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Рівень відвідуваності
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="info.main">
                  {stats.avgTemperature}°C
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Середня температура
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="warning.main">
                  {stats.avgHumidity}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Середня вологість
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Фільтри */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Тип даних</InputLabel>
                <Select
                  value={selectedType}
                  label="Тип даних"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="attendance">Відвідуваність</MenuItem>
                  <MenuItem value="temperature">Температура</MenuItem>
                  <MenuItem value="humidity">Вологість</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Дата початку"
                type="date"
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Дата закінчення"
                type="date"
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Таблиця активності */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Останні записи активності ({getActivityTypeText(selectedType)})
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Студент</TableCell>
                  <TableCell>Тип події</TableCell>
                  <TableCell>Значення</TableCell>
                  <TableCell>Пристрій</TableCell>
                  <TableCell>Розташування</TableCell>
                  <TableCell>Час</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity._id}>
                    <TableCell>{activity.student.name}</TableCell>
                    <TableCell>{getActivityTypeText(activity.type)}</TableCell>
                    <TableCell>{formatValue(activity)}</TableCell>
                    <TableCell>{activity.deviceId.name}</TableCell>
                    <TableCell>{activity.deviceId.location}</TableCell>
                    <TableCell>
                      {new Date(activity.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {activities.length === 0 && !loading && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                Немає даних для відображення
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Перевірте підключення IoT пристроїв або змініть параметри фільтрації
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentActivityMonitor; 