const IoTDevice = require('../models/IoTDevice');
const SensorData = require('../models/SensorData');

// Отримати всі пристрої
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await IoTDevice.find().populate('group');
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Отримати один пристрій
exports.getDevice = async (req, res) => {
  try {
    const device = await IoTDevice.findById(req.params.id).populate('group');
    if (!device) {
      return res.status(404).json({ message: 'Пристрій не знайдено' });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Створити новий пристрій
exports.createDevice = async (req, res) => {
  try {
    const device = new IoTDevice(req.body);
    await device.save();
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Оновити пристрій
exports.updateDevice = async (req, res) => {
  try {
    const device = await IoTDevice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!device) {
      return res.status(404).json({ message: 'Пристрій не знайдено' });
    }
    res.json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Видалити пристрій
exports.deleteDevice = async (req, res) => {
  try {
    const device = await IoTDevice.findByIdAndDelete(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Пристрій не знайдено' });
    }
    // Видалити всі пов'язані сенсорні дані
    await SensorData.deleteMany({ deviceId: req.params.id });
    res.json({ message: 'Пристрій видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Отримати дані сенсорів для пристрою
exports.getDeviceSensorData = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    const query = { deviceId: req.params.id };
    
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    if (type) {
      query.type = type;
    }
    
    const data = await SensorData.find(query)
      .populate('student')
      .sort({ timestamp: -1 });
      
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Оновити конфігурацію пристрою
exports.updateDeviceConfig = async (req, res) => {
  try {
    const device = await IoTDevice.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Пристрій не знайдено' });
    }
    
    device.config = { ...device.config, ...req.body };
    await device.save();
    
    // Публікація нової конфігурації через MQTT
    const aedes = require('../mqtt-broker');
    aedes.publish({
      topic: `device/${device.deviceId}/config`,
      payload: JSON.stringify(device.config)
    });
    
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 