package com.example.lab51.service

import android.content.Context
import android.util.Log
import com.example.lab51.data.local.dao.IoTDao
import com.example.lab51.data.model.IoTSensorData
import com.example.lab51.data.model.SensorType
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.eclipse.paho.android.service.MqttAndroidClient
import org.eclipse.paho.client.mqttv3.*
import java.util.UUID
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class MqttIoTService @Inject constructor(
    private val context: Context,
    private val iotDao: IoTDao,
    private val gson: Gson
) {
    private val TAG = "MqttIoTService"
    private var mqttClient: MqttAndroidClient? = null
    private val scope = CoroutineScope(Dispatchers.IO)
    
    companion object {
        private const val BROKER_URL = "tcp://your-mqtt-broker.com:1883" // Replace with your MQTT broker
        private const val CLIENT_ID = "StudentTrackingApp"
        private const val QOS = 1
        
        // MQTT Topics
        const val TOPIC_TEMPERATURE = "sensors/temperature/+"
        const val TOPIC_HUMIDITY = "sensors/humidity/+"
        const val TOPIC_ATTENDANCE = "sensors/attendance/+"
        const val TOPIC_MOTION = "sensors/motion/+"
        const val TOPIC_AIR_QUALITY = "sensors/air_quality/+"
    }
    
    fun connect() {
        try {
            mqttClient = MqttAndroidClient(context, BROKER_URL, CLIENT_ID)
            
            val options = MqttConnectOptions().apply {
                isAutomaticReconnect = true
                isCleanSession = false
                connectionTimeout = 30
                keepAliveInterval = 60
            }
            
            mqttClient?.setCallback(object : MqttCallback {
                override fun connectionLost(cause: Throwable?) {
                    Log.w(TAG, "Connection lost", cause)
                }
                
                override fun messageArrived(topic: String, message: MqttMessage) {
                    handleIncomingMessage(topic, message)
                }
                
                override fun deliveryComplete(token: IMqttDeliveryToken?) {
                    Log.d(TAG, "Message delivery complete")
                }
            })
            
            mqttClient?.connect(options, null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "Connected to MQTT broker")
                    subscribeToTopics()
                }
                
                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.e(TAG, "Failed to connect to MQTT broker", exception)
                }
            })
            
        } catch (e: Exception) {
            Log.e(TAG, "Error connecting to MQTT", e)
        }
    }
    
    private fun subscribeToTopics() {
        val topics = arrayOf(
            TOPIC_TEMPERATURE,
            TOPIC_HUMIDITY,
            TOPIC_ATTENDANCE,
            TOPIC_MOTION,
            TOPIC_AIR_QUALITY
        )
        
        val qos = IntArray(topics.size) { QOS }
        
        try {
            mqttClient?.subscribe(topics, qos, null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "Subscribed to IoT topics")
                }
                
                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.e(TAG, "Failed to subscribe to topics", exception)
                }
            })
        } catch (e: Exception) {
            Log.e(TAG, "Error subscribing to topics", e)
        }
    }
    
    private fun handleIncomingMessage(topic: String, message: MqttMessage) {
        try {
            val payload = String(message.payload)
            Log.d(TAG, "Received message on topic $topic: $payload")
            
            val sensorData = parseSensorData(topic, payload)
            if (sensorData != null) {
                scope.launch {
                    iotDao.insertSensorData(sensorData)
                    Log.d(TAG, "Stored sensor data: ${sensorData.sensorType} = ${sensorData.value}")
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error handling incoming message", e)
        }
    }
    
    private fun parseSensorData(topic: String, payload: String): IoTSensorData? {
        return try {
            val topicParts = topic.split("/")
            if (topicParts.size < 3) return null
            
            val sensorType = when (topicParts[1]) {
                "temperature" -> SensorType.TEMPERATURE
                "humidity" -> SensorType.HUMIDITY
                "attendance" -> SensorType.ATTENDANCE
                "motion" -> SensorType.MOTION
                "air_quality" -> SensorType.AIR_QUALITY
                else -> return null
            }
            
            val location = topicParts[2]
            val messageData = gson.fromJson(payload, SensorMessage::class.java)
            
            IoTSensorData(
                id = UUID.randomUUID().toString(),
                sensorId = messageData.sensorId,
                sensorType = sensorType,
                location = location,
                value = messageData.value,
                unit = messageData.unit,
                timestamp = messageData.timestamp ?: System.currentTimeMillis(),
                metadata = messageData.metadata
            )
        } catch (e: Exception) {
            Log.e(TAG, "Error parsing sensor data", e)
            null
        }
    }
    
    fun publishMessage(topic: String, message: String) {
        try {
            val mqttMessage = MqttMessage(message.toByteArray()).apply {
                qos = QOS
            }
            
            mqttClient?.publish(topic, mqttMessage, null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "Message published to $topic")
                }
                
                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.e(TAG, "Failed to publish message to $topic", exception)
                }
            })
        } catch (e: Exception) {
            Log.e(TAG, "Error publishing message", e)
        }
    }
    
    fun disconnect() {
        try {
            mqttClient?.disconnect(null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "Disconnected from MQTT broker")
                }
                
                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.e(TAG, "Failed to disconnect from MQTT broker", exception)
                }
            })
        } catch (e: Exception) {
            Log.e(TAG, "Error disconnecting from MQTT", e)
        }
    }
    
    data class SensorMessage(
        val sensorId: String,
        val value: Double,
        val unit: String,
        val timestamp: Long? = null,
        val metadata: String? = null
    )
} 