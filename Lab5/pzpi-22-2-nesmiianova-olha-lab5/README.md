# Student Tracking Android App

Мобільний застосунок для відстеження успішності студентів на платформі Android з використанням Kotlin та Jetpack Compose.

## 🚀 Функціональність

### 📱 Основні можливості
- **Авторизація та реєстрація** студентів та викладачів
- **Перегляд оцінок** з фільтруванням по предметах
- **Розклад занять** з інтерактивним календарем
- **IoT моніторинг** аудиторій та відвідуваності
- **Профіль користувача** з налаштуваннями

### 🌐 Інтеграції
- **Firebase Authentication** для автентифікації
- **REST API** для синхронізації з сервером
- **MQTT протокол** для IoT пристроїв
- **Room Database** для локального збереження
- **Real-time updates** через WebSocket/MQTT

### 🎨 UI/UX
- **Material Design 3** з підтримкою темної теми
- **Багатомовність** (Українська/Англійська)
- **Адаптивний дизайн** для різних розмірів екранів
- **Анімації та переходи** між екранами

## 🏗️ Архітектура

### MVVM Pattern
```
┌─ Presentation Layer (UI)
│  ├─ Activities/Fragments
│  ├─ Compose Screens
│  └─ ViewModels
│
├─ Domain Layer (Business Logic)
│  ├─ Use Cases
│  ├─ Repositories (Interfaces)
│  └─ Models
│
└─ Data Layer
   ├─ Local (Room Database)
   ├─ Remote (Retrofit API)
   └─ Repository Implementations
```

### Технології та бібліотеки

#### Core
- **Kotlin** - основна мова програмування
- **Jetpack Compose** - сучасний UI toolkit
- **Coroutines** - асинхронне програмування
- **Flow** - реактивні потоки даних

#### Dependency Injection
- **Hilt** - DI framework від Google

#### Navigation
- **Navigation Compose** - навігація між екранами

#### Networking
- **Retrofit 2** - HTTP клієнт
- **OkHttp 3** - HTTP/HTTP2 клієнт
- **Gson** - JSON серіалізація

#### Database
- **Room** - локальна база даних
- **SQLite** - вбудована база даних

#### Authentication
- **Firebase Auth** - аутентифікація користувачів
- **Firebase Firestore** - хмарна база даних

#### IoT Communication
- **MQTT (Paho)** - протокол для IoT пристроїв
- **WebSocket** - real-time комунікація

#### UI/Theming
- **Material 3** - Material Design компоненти
- **Accompanist** - додаткові UI компоненти

#### Testing
- **JUnit 4** - unit тестування
- **Espresso** - UI тестування
- **Hilt Testing** - тестування з DI

## 📁 Структура проєкту

```
app/src/main/java/com/example/lab51/
├── data/
│   ├── local/
│   │   ├── dao/           # Room DAO інтерфейси
│   │   ├── database/      # База даних
│   │   └── entities/      # Room сутності
│   ├── remote/
│   │   ├── api/           # Retrofit API інтерфейси
│   │   └── dto/           # Data Transfer Objects
│   ├── repository/        # Repository реалізації
│   └── model/             # Доменні моделі
├── di/                    # Hilt модулі
├── presentation/
│   ├── auth/              # Екрани авторизації
│   ├── dashboard/         # Головний екран
│   ├── grades/            # Екрани оцінок
│   ├── schedule/          # Екрани розкладу
│   ├── iot/               # IoT моніторинг
│   ├── profile/           # Профіль користувача
│   └── main/              # Головна навігація
├── service/               # Background сервіси
├── utils/                 # Утиліти та хелпери
└── ui/
    └── theme/             # Теми та стилі
```

## 🚀 Встановлення та запуск

### Вимоги
- Android Studio Hedgehog (2023.1.1) або новіше
- Kotlin 1.9.0+
- Android SDK 24+ (минімальна версія)
- Android SDK 35+ (цільова версія)

### Налаштування

1. **Клонування репозиторію**
```bash
git clone <repository-url>
cd Lab51
```

2. **Налаштування Firebase**
   - Створіть проєкт у [Firebase Console](https://console.firebase.google.com)
   - Завантажте `google-services.json`
   - Помістіть файл у `app/` директорію

3. **Налаштування API**
   - Оновіть URL API у `NetworkModule.kt`
   - Налаштуйте MQTT broker у `MqttIoTService.kt`

4. **Збірка проєкту**
```bash
./gradlew assembleDebug
```

### Конфігурація

#### API Configuration
```kotlin
// app/src/main/java/com/example/lab51/di/NetworkModule.kt
private const val BASE_URL = "https://your-api-url.com/api/"
```

#### MQTT Configuration
```kotlin
// app/src/main/java/com/example/lab51/service/MqttIoTService.kt
private const val BROKER_URL = "tcp://your-mqtt-broker.com:1883"
```

## 📱 Функціональні екрани

### 🔐 Авторизація
- Вхід через email/пароль
- Реєстрація нових користувачів
- Інтеграція з Firebase Auth
- Валідація даних

### 📊 Dashboard
- Швидка статистика
- Останні активності
- Середній бал
- Відсоток відвідуваності

### 📚 Оцінки
- Список всіх оцінок
- Фільтрування по предметах
- Детальна інформація
- Графіки успішності

### 📅 Розклад
- Тижневий розклад
- Деталі занять
- Статус занять
- Інформація про викладачів

### 🌡️ IoT Моніторинг
- Стан сенсорів
- Мікроклімат аудиторій
- Відстеження відвідуваності
- Real-time оновлення

### 👤 Профіль
- Інформація користувача
- Налаштування додатку
- Багатомовність
- Темна/світла тема

## 🔧 IoT Інтеграція

### MQTT Topics
```
sensors/temperature/{room_id}
sensors/humidity/{room_id}
sensors/attendance/{room_id}
sensors/motion/{room_id}
sensors/air_quality/{room_id}
```

### Формат повідомлень
```json
{
  "sensorId": "temp_001",
  "value": 22.5,
  "unit": "°C",
  "timestamp": 1699123456789,
  "metadata": "{\"location\": \"Room 101\"}"
}
```

## 🌍 Багатомовність

Застосунок підтримує:
- 🇬🇧 Англійську (за замовчуванням)
- 🇺🇦 Українську

Файли локалізації:
- `app/src/main/res/values/strings.xml` (English)
- `app/src/main/res/values-uk/strings.xml` (Ukrainian)

## 🎨 Теми

### Світла тема
- Material Design 3 кольори
- Високий контраст
- Оптимізовано для денного використання

### Темна тема
- Автоматичне перемикання
- Зменшене напруження очей
- Економія батареї на OLED

## 🧪 Тестування

### Unit Tests
```bash
./gradlew test
```

### UI Tests
```bash
./gradlew connectedAndroidTest
```

### Покриття коду
```bash
./gradlew jacocoTestReport
```

## 📱 Розгортання

### Debug Build
```bash
./gradlew assembleDebug
```

### Release Build
```bash
./gradlew assembleRelease
```

### Play Store
1. Підписання APK
2. Завантаження у Play Console
3. Тестування через Internal Testing
4. Production release

## 🤝 Внесок у проект

1. Fork проєкту
2. Створіть feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit зміни (`git commit -m 'Add some AmazingFeature'`)
4. Push до branch (`git push origin feature/AmazingFeature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

Цей проєкт ліцензовано під MIT License - див. файл [LICENSE](LICENSE).

## 👥 Автори

- **Your Name** - *Розробка* - [GitHub Profile](https://github.com/yourusername)

## 📞 Підтримка

Для питань та підтримки:
- Email: your.email@example.com
- GitHub Issues: [Create Issue](https://github.com/yourusername/repo/issues)

---

**Розроблено з ❤️ для освітніх цілей** 