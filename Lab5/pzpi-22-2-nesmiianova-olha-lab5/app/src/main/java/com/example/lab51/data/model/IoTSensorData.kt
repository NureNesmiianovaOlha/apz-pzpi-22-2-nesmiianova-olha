package com.example.lab51.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
@Entity(tableName = "iot_sensor_data")
data class IoTSensorData(
    @PrimaryKey val id: String,
    val sensorId: String,
    val sensorType: SensorType,
    val location: String, // Classroom or location identifier
    val value: Double,
    val unit: String,
    val timestamp: Long = System.currentTimeMillis(),
    val metadata: String? = null // JSON string for additional data
) : Parcelable

enum class SensorType {
    TEMPERATURE,
    HUMIDITY,
    ATTENDANCE,
    MOTION,
    LIGHT,
    AIR_QUALITY,
    NOISE_LEVEL,
    DOOR_SENSOR
}

@Parcelize
@Entity(tableName = "attendance_records")
data class AttendanceRecord(
    @PrimaryKey val id: String,
    val studentId: String,
    val scheduleId: String,
    val status: AttendanceStatus,
    val timestamp: Long = System.currentTimeMillis(),
    val sensorId: String? = null, // If detected by IoT sensor
    val manualEntry: Boolean = false
) : Parcelable

enum class AttendanceStatus {
    PRESENT,
    ABSENT,
    LATE,
    EXCUSED
} 