# Система відстеження успішності студентів з IoT-інтеграцією

## Опис системи

Система призначена для відстеження успішності студентів коледжу з додатковими можливостями автоматизованого збору даних через IoT-пристрої. Система включає:

- Веб-інтерфейс для управління студентами, викладачами та оцінками
- IoT-пристрої для автоматизованого збору даних (відвідуваність, активність)
- MQTT брокер для комунікації з IoT-пристроями
- REST API для інтеграції

## Технічні вимоги

### Серверна частина
- Node.js (v14+)
- MongoDB
- MQTT Broker (Aedes)

### IoT-пристрої
- ESP32 або Raspberry Pi
- Для ESP32:
  - Arduino IDE
  - Необхідні бібліотеки:
    - PubSubClient
    - ArduinoJson
    - MFRC522 (для RFID)
- Для Raspberry Pi:
  - Python 3.7+
  - paho-mqtt
  - RPi.GPIO

## Встановлення

1. Клонуйте репозиторій:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Встановіть залежності:
```bash
npm install
```

3. Створіть файл .env з наступними змінними:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-tracking
JWT_SECRET=your_jwt_secret
MQTT_PORT=1883
MQTT_WS_PORT=8888
```

4. Запустіть сервер:
```bash
npm run dev
```

## Налаштування IoT-пристроїв

### ESP32 (Відстеження відвідуваності)

1. Відкрийте Arduino IDE
2. Встановіть необхідні бібліотеки через Arduino Library Manager
3. Відкрийте файл `esp32_example/attendance_tracker.ino`
4. Оновіть налаштування WiFi та MQTT:
   ```cpp
   const char* ssid = "YOUR_WIFI_SSID";
   const char* password = "YOUR_WIFI_PASSWORD";
   const char* mqtt_server = "YOUR_SERVER_IP";
   ```
5. Завантажте код на ESP32

### Raspberry Pi

1. Встановіть необхідні пакети:
   ```bash
   pip install paho-mqtt RPi.GPIO
   ```
2. Налаштуйте конфігурацію в файлі конфігурації

## API Endpoints

### IoT API

- `GET /api/iot/devices` - Отримати список всіх пристроїв
- `POST /api/iot/devices` - Додати новий пристрій
- `GET /api/iot/devices/:id` - Отримати інформацію про пристрій
- `PUT /api/iot/devices/:id` - Оновити інформацію про пристрій
- `DELETE /api/iot/devices/:id` - Видалити пристрій
- `GET /api/iot/devices/:id/data` - Отримати дані з пристрою
- `PUT /api/iot/devices/:id/config` - Оновити конфігурацію пристрою

### MQTT Topics

- `sensor/attendance` - Дані про відвідуваність
- `sensor/status` - Статус пристрою
- `device/{deviceId}/config` - Конфігурація пристрою

## Безпека

- Всі API endpoints захищені JWT автентифікацією
- MQTT з'єднання захищені username/password автентифікацією
- Дані передаються в зашифрованому вигляді
- Реалізована система ролей (admin, teacher, student)

## Розробка

Для запуску в режимі розробки:
```bash
npm run dev
```

Для запуску тестів:
```bash
npm test
```

## Ліцензія

ISC 