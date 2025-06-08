package com.example.lab51.data.local

import androidx.room.TypeConverter
import com.example.lab51.data.model.*

class Converters {
    
    @TypeConverter
    fun fromUserRole(role: UserRole): String = role.name
    
    @TypeConverter
    fun toUserRole(role: String): UserRole = UserRole.valueOf(role)
    
    @TypeConverter
    fun fromGradeType(type: GradeType): String = type.name
    
    @TypeConverter
    fun toGradeType(type: String): GradeType = GradeType.valueOf(type)
    
    @TypeConverter
    fun fromLessonType(type: LessonType): String = type.name
    
    @TypeConverter
    fun toLessonType(type: String): LessonType = LessonType.valueOf(type)
    
    @TypeConverter
    fun fromWeekType(type: WeekType): String = type.name
    
    @TypeConverter
    fun toWeekType(type: String): WeekType = WeekType.valueOf(type)
    
    @TypeConverter
    fun fromSensorType(type: SensorType): String = type.name
    
    @TypeConverter
    fun toSensorType(type: String): SensorType = SensorType.valueOf(type)
    
    @TypeConverter
    fun fromAttendanceStatus(status: AttendanceStatus): String = status.name
    
    @TypeConverter
    fun toAttendanceStatus(status: String): AttendanceStatus = AttendanceStatus.valueOf(status)
} 