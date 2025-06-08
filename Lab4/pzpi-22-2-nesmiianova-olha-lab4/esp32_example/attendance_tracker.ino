#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <MFRC522.h>
#include <SPI.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// MQTT Broker settings
const char* mqtt_server = "YOUR_SERVER_IP";
const int mqtt_port = 1883;
const char* mqtt_client_id = "esp32_attendance_1"; // Унікальний ID пристрою
const char* mqtt_username = "YOUR_MQTT_USERNAME";
const char* mqtt_password = "YOUR_MQTT_PASSWORD";

// RFID pins
#define SS_PIN    21
#define RST_PIN   22
#define LED_PIN   2

// Initialize instances
WiFiClient espClient;
PubSubClient client(espClient);
MFRC522 rfid(SS_PIN, RST_PIN);

// Device configuration
StaticJsonDocument<512> config;
bool configUpdated = false;

void setup() {
  Serial.begin(115200);
  
  // Initialize LED
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Initialize RFID
  SPI.begin();
  rfid.PCD_Init();
  
  // Connect to WiFi
  setup_wifi();
  
  // Configure MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  
  if (String(topic) == "device/" + String(mqtt_client_id) + "/config") {
    DeserializationError error = deserializeJson(config, message);
    if (!error) {
      configUpdated = true;
      Serial.println("New configuration received");
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(mqtt_client_id, mqtt_username, mqtt_password)) {
      Serial.println("connected");
      
      // Subscribe to config updates
      String configTopic = "device/" + String(mqtt_client_id) + "/config";
      client.subscribe(configTopic.c_str());
      
      // Publish device status
      StaticJsonDocument<200> status;
      status["status"] = "connected";
      status["ip"] = WiFi.localIP().toString();
      
      String statusJson;
      serializeJson(status, statusJson);
      
      client.publish("sensor/status", statusJson.c_str());
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void publishAttendance(String cardId) {
  if (!client.connected()) {
    return;
  }
  
  StaticJsonDocument<200> doc;
  doc["type"] = "attendance";
  doc["value"] = true;
  doc["cardId"] = cardId;
  doc["timestamp"] = millis();
  
  String json;
  serializeJson(doc, json);
  
  client.publish("sensor/attendance", json.c_str());
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Check for RFID card
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String cardId = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      cardId += String(rfid.uid.uidByte[i], HEX);
    }
    
    // Flash LED
    digitalWrite(LED_PIN, HIGH);
    delay(200);
    digitalWrite(LED_PIN, LOW);
    
    // Publish attendance
    publishAttendance(cardId);
    
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
  
  delay(100);
} 