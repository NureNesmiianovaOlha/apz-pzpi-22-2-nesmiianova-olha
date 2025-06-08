const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const IoTDevice = require('../models/IoTDevice');
const SensorData = require('../models/SensorData');
const User = require('../models/User');

let mongoServer;
let token;
let adminUser;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Створюємо тестового адміністратора
  adminUser = await User.create({
    name: 'Test Admin',
    email: 'admin@test.com',
    password: 'password123',
    role: 'admin'
  });

  token = adminUser.getSignedJwtToken();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('IoT Device API Tests', () => {
  let deviceId;

  test('Should create a new IoT device', async () => {
    const response = await request(app)
      .post('/api/iot')
      .set('Authorization', `Bearer ${token}`)
      .send({
        deviceId: 'test_device_1',
        name: 'Test Device',
        type: 'ESP32',
        location: 'Room 101',
        group: mongoose.Types.ObjectId()
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('deviceId', 'test_device_1');
    deviceId = response.body._id;
  });

  test('Should get all devices', async () => {
    const response = await request(app)
      .get('/api/iot')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('Should get a specific device', async () => {
    const response = await request(app)
      .get(`/api/iot/${deviceId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', deviceId);
  });

  test('Should update device config', async () => {
    const config = {
      updateInterval: 5000,
      ledEnabled: true
    };

    const response = await request(app)
      .put(`/api/iot/${deviceId}/config`)
      .set('Authorization', `Bearer ${token}`)
      .send(config);

    expect(response.status).toBe(200);
    expect(response.body.config).toMatchObject(config);
  });

  test('Should delete a device', async () => {
    const response = await request(app)
      .delete(`/api/iot/${deviceId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    
    // Перевіряємо, що пристрій дійсно видалено
    const checkDevice = await request(app)
      .get(`/api/iot/${deviceId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(checkDevice.status).toBe(404);
  });
});

describe('Sensor Data API Tests', () => {
  let deviceId;
  let studentId;

  beforeEach(async () => {
    // Створюємо тестового студента
    const student = await User.create({
      name: 'Test Student',
      email: 'student@test.com',
      password: 'password123',
      role: 'student'
    });
    studentId = student._id;

    // Створюємо тестовий пристрій
    const device = await IoTDevice.create({
      deviceId: 'test_device_2',
      name: 'Test Device 2',
      type: 'ESP32',
      location: 'Room 102',
      group: mongoose.Types.ObjectId()
    });
    deviceId = device._id;

    // Створюємо тестові дані сенсора
    await SensorData.create({
      deviceId: device._id,
      student: studentId,
      type: 'attendance',
      value: true
    });
  });

  test('Should get sensor data for device', async () => {
    const response = await request(app)
      .get(`/api/iot/${deviceId}/data`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Should filter sensor data by type', async () => {
    const response = await request(app)
      .get(`/api/iot/${deviceId}/data?type=attendance`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].type).toBe('attendance');
  });
}); 