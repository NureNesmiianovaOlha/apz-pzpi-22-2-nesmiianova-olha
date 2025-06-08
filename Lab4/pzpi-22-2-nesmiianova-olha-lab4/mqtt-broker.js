const aedes = require('aedes')();
const { createServer } = require('net');
const ws = require('websocket-stream');
const { createServer: createHttpServer } = require('http');
const IoTDevice = require('./models/IoTDevice');
const SensorData = require('./models/SensorData');

// TCP сервер для MQTT
const server = createServer(aedes.handle);
const port = process.env.MQTT_PORT || 1883;

// WebSocket сервер для MQTT через веб
const httpServer = createHttpServer();
const wsPort = process.env.MQTT_WS_PORT || 8888;

// Налаштування WebSocket
ws.createServer({ server: httpServer }, aedes.handle);

// Обробка підключення клієнтів
aedes.on('client', async (client) => {
  console.log(`Client Connected: ${client.id}`);
  
  try {
    await IoTDevice.findOneAndUpdate(
      { deviceId: client.id },
      { 
        status: 'active',
        lastSeen: new Date()
      },
      { upsert: false }
    );
  } catch (error) {
    console.error('Error updating device status:', error);
  }
});

// Обробка відключення клієнтів
aedes.on('clientDisconnect', async (client) => {
  console.log(`Client Disconnected: ${client.id}`);
  
  try {
    await IoTDevice.findOneAndUpdate(
      { deviceId: client.id },
      { status: 'inactive' }
    );
  } catch (error) {
    console.error('Error updating device status:', error);
  }
});

// Обробка публікації повідомлень
aedes.on('publish', async (packet, client) => {
  if (!client) return;
  
  if (packet.topic.startsWith('sensor/')) {
    try {
      const data = JSON.parse(packet.payload.toString());
      const device = await IoTDevice.findOne({ deviceId: client.id });
      
      if (!device) {
        console.error(`Unknown device: ${client.id}`);
        return;
      }

      const sensorData = new SensorData({
        deviceId: device._id,
        student: data.studentId,
        type: data.type,
        value: data.value,
        metadata: data.metadata
      });

      await sensorData.save();
    } catch (error) {
      console.error('Error processing sensor data:', error);
    }
  }
});

// Запуск серверів
server.listen(port, function () {
  console.log(`MQTT Broker running on port ${port}`);
});

httpServer.listen(wsPort, function () {
  console.log(`MQTT WebSocket running on port ${wsPort}`);
});

module.exports = aedes; 