package com.example.lab51.data.local

import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import android.content.Context
import com.example.lab51.data.local.dao.*
import com.example.lab51.data.model.*

@Database(
    entities = [
        User::class,
        Subject::class,
        Grade::class,
        Schedule::class,
        IoTSensorData::class,
        AttendanceRecord::class
    ],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class StudentTrackingDatabase : RoomDatabase() {
    
    abstract fun userDao(): UserDao
    abstract fun subjectDao(): SubjectDao
    abstract fun gradeDao(): GradeDao
    abstract fun scheduleDao(): ScheduleDao
    abstract fun iotDao(): IoTDao
    
    companion object {
        @Volatile
        private var INSTANCE: StudentTrackingDatabase? = null
        
        fun getDatabase(context: Context): StudentTrackingDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    StudentTrackingDatabase::class.java,
                    "student_tracking_database"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
} 