package com.example.lab51.data.local.dao

import androidx.room.*
import com.example.lab51.data.model.IoTSensorData
import com.example.lab51.data.model.SensorType
import com.example.lab51.data.model.AttendanceRecord
import com.example.lab51.data.model.AttendanceStatus
import kotlinx.coroutines.flow.Flow

@Dao
interface IoTDao {
    
    // IoT Sensor Data
    @Query("SELECT * FROM iot_sensor_data WHERE sensorId = :sensorId ORDER BY timestamp DESC")
    fun getSensorData(sensorId: String): Flow<List<IoTSensorData>>
    
    @Query("SELECT * FROM iot_sensor_data WHERE sensorType = :sensorType ORDER BY timestamp DESC")
    fun getSensorDataByType(sensorType: SensorType): Flow<List<IoTSensorData>>
    
    @Query("SELECT * FROM iot_sensor_data WHERE location = :location ORDER BY timestamp DESC")
    fun getSensorDataByLocation(location: String): Flow<List<IoTSensorData>>
    
    @Query("""
        SELECT * FROM iot_sensor_data 
        WHERE timestamp BETWEEN :startTime AND :endTime 
        ORDER BY timestamp DESC
    """)
    fun getSensorDataInPeriod(startTime: Long, endTime: Long): Flow<List<IoTSensorData>>
    
    @Query("""
        SELECT AVG(value) FROM iot_sensor_data 
        WHERE sensorType = :sensorType AND location = :location
        AND timestamp >= :since
    """)
    suspend fun getAverageSensorValue(sensorType: SensorType, location: String, since: Long): Double?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSensorData(data: IoTSensorData)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSensorData(data: List<IoTSensorData>)
    
    @Query("DELETE FROM iot_sensor_data WHERE timestamp < :cutoffTime")
    suspend fun deleteOldSensorData(cutoffTime: Long)
    
    // Attendance Records
    @Query("SELECT * FROM attendance_records WHERE studentId = :studentId ORDER BY timestamp DESC")
    fun getAttendanceByStudent(studentId: String): Flow<List<AttendanceRecord>>
    
    @Query("SELECT * FROM attendance_records WHERE scheduleId = :scheduleId")
    fun getAttendanceBySchedule(scheduleId: String): Flow<List<AttendanceRecord>>
    
    @Query("""
        SELECT * FROM attendance_records 
        WHERE studentId = :studentId AND scheduleId = :scheduleId
    """)
    suspend fun getAttendanceRecord(studentId: String, scheduleId: String): AttendanceRecord?
    
    @Query("""
        SELECT COUNT(*) FROM attendance_records 
        WHERE studentId = :studentId AND status = :status
    """)
    suspend fun getAttendanceCount(studentId: String, status: AttendanceStatus): Int
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAttendanceRecord(record: AttendanceRecord)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAttendanceRecords(records: List<AttendanceRecord>)
    
    @Update
    suspend fun updateAttendanceRecord(record: AttendanceRecord)
    
    @Query("DELETE FROM attendance_records WHERE id = :recordId")
    suspend fun deleteAttendanceRecord(recordId: String)
} 