const mongoose = require('mongoose');

const iotDeviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: [true, 'Будь ласка, введіть ID пристрою'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Будь ласка, введіть назву пристрою']
  },
  type: {
    type: String,
    enum: ['ESP32', 'RaspberryPi'],
    required: true
  },
  location: {
    type: String,
    required: [true, 'Будь ласка, вкажіть місцезнаходження']
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  config: {
    updateInterval: {
      type: Number,
      default: 5000
    },
    ledEnabled: {
      type: Boolean,
      default: true
    },
    temperatureThreshold: {
      type: Number,
      default: 25
    },
    humidityThreshold: {
      type: Number,
      default: 60
    }
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('IoTDevice', iotDeviceSchema); 