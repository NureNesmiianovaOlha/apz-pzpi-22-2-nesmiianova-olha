import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Alert
} from '@mui/material';
import { Add, Settings, Delete, Refresh } from '@mui/icons-material';
import { iotApi } from '../../services/api';

interface IoTDevice {
  _id: string;
  deviceId: string;
  name: string;
  type: 'ESP32' | 'RaspberryPi';
  location: string;
  status: 'active' | 'inactive';
  group: {
    _id: string;
    name: string;
  };
  config: {
    updateInterval: number;
    ledEnabled: boolean;
    temperatureThreshold: number;
    humidityThreshold: number;
  };
  lastSeen: string;
}

const IoTDeviceList: React.FC = () => {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Тимчасово використовуємо мок дані, поки API не готове
      const mockDevices: IoTDevice[] = [
        {
          _id: '1',
          deviceId: 'ESP32_001',
          name: 'RFID сканер аудиторія 101',
          type: 'ESP32',
          location: 'Аудиторія 101',
          status: 'active',
          group: {
            _id: '1',
            name: 'ІТ-21'
          },
          config: {
            updateInterval: 5000,
            ledEnabled: true,
            temperatureThreshold: 25,
            humidityThreshold: 60
          },
          lastSeen: new Date().toISOString()
        },
        {
          _id: '2',
          deviceId: 'ESP32_002',
          name: 'Датчик температури/вологості',
          type: 'ESP32',
          location: 'Лабораторія А',
          status: 'active',
          group: {
            _id: '2',
            name: 'ФН-22'
          },
          config: {
            updateInterval: 10000,
            ledEnabled: false,
            temperatureThreshold: 22,
            humidityThreshold: 55
          },
          lastSeen: new Date(Date.now() - 60000).toISOString()
        }
      ];
      
      setDevices(mockDevices);
      
      // Коли API буде готове, розкоментуйте:
      // const data = await iotApi.getDevices();
      // setDevices(data);
    } catch (err) {
      setError('Помилка при завантаженні пристроїв IoT');
      console.error('Error fetching IoT devices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDeleteDevice = async (deviceId: string) => {
    if (window.confirm('Ви дійсно хочете видалити цей пристрій?')) {
      try {
        // await iotApi.deleteDevice(deviceId);
        // Тимчасово просто видаляємо з локального стану
        setDevices(devices.filter(device => device._id !== deviceId));
        console.log('Device deleted:', deviceId);
      } catch (err) {
        setError('Помилка при видаленні пристрою');
      }
    }
  };

  const handleConfigDevice = (device: IoTDevice) => {
    setSelectedDevice(device);
    setConfigDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getStatusText = (status: string) => {
    return status === 'active' ? 'Активний' : 'Неактивний';
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" component="h2">
              IoT Пристрої для моніторингу студентів
            </Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={fetchDevices}
                disabled={loading}
                sx={{ mr: 1 }}
              >
                Оновити
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                // onClick={() => setAddDialogOpen(true)}
              >
                Додати пристрій
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Система IoT для автоматичного відстеження відвідуваності, активності та умов навчання студентів
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Назва пристрою</TableCell>
                  <TableCell>ID пристрою</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Розташування</TableCell>
                  <TableCell>Група</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Остання активність</TableCell>
                  <TableCell>Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device._id}>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.deviceId}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell>{device.group?.name || 'Не призначено'}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(device.status)}
                        color={getStatusColor(device.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'Ніколи'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleConfigDevice(device)}
                        title="Налаштування"
                      >
                        <Settings />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteDevice(device._id)}
                        title="Видалити"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {devices.length === 0 && !loading && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                Немає зареєстрованих IoT пристроїв
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Додайте пристрої для автоматичного збору даних про студентів
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={configDialogOpen}
        onClose={() => setConfigDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Налаштування пристрою: {selectedDevice?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Конфігурація пристрою "{selectedDevice?.name}"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Інтервал оновлення: {selectedDevice?.config.updateInterval}мс
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • LED індикатор: {selectedDevice?.config.ledEnabled ? 'Увімкнено' : 'Вимкнено'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Поріг температури: {selectedDevice?.config.temperatureThreshold}°C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Поріг вологості: {selectedDevice?.config.humidityThreshold}%
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default IoTDeviceList; 