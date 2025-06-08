const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const IoTDevice = require('../models/IoTDevice');
const SensorData = require('../models/SensorData');

// Отримати всі пристрої
router.get('/', protect, async (req, res) => {
  try {
    const devices = await IoTDevice.find().populate('group');
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Створити новий пристрій
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const device = new IoTDevice(req.body);
    await device.save();
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Отримати конкретний пристрій
router.get('/:id', protect, async (req, res) => {
  try {
    const device = await IoTDevice.findById(req.params.id).populate('group');
    if (!device) {
      return res.status(404).json({ message: 'Пристрій не знайдено' });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Оновити конфігурацію пристрою
router.put('/:id/config', protect, authorize('admin'), async (req, res) => {
  try {
    const device = await IoTDevice.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Пристрій не знайдено' });
    }
    device.config = { ...device.config, ...req.body };
    await device.save();
    res.json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Видалити пристрій
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const device = await IoTDevice.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Пристрій не знайдено' });
    }
    await device.remove();
    res.json({ message: 'Пристрій видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Отримати дані сенсорів для пристрою
router.get('/:id/data', protect, async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    const query = { deviceId: req.params.id };
    
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    if (type) {
      query.type = type;
    }
    
    const data = await SensorData.find(query)
      .populate('student', 'name')
      .sort('-timestamp');
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 