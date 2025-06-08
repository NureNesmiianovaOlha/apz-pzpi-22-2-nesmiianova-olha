package com.example.lab51.di

import android.content.Context
import androidx.room.Room
import com.example.lab51.data.local.StudentTrackingDatabase
import com.example.lab51.data.local.dao.*
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {
    
    @Provides
    @Singleton
    fun provideStudentTrackingDatabase(@ApplicationContext context: Context): StudentTrackingDatabase {
        return Room.databaseBuilder(
            context.applicationContext,
            StudentTrackingDatabase::class.java,
            "student_tracking_database"
        )
            .fallbackToDestructiveMigration()
            .build()
    }
    
    @Provides
    fun provideUserDao(database: StudentTrackingDatabase): UserDao {
        return database.userDao()
    }
    
    @Provides
    fun provideSubjectDao(database: StudentTrackingDatabase): SubjectDao {
        return database.subjectDao()
    }
    
    @Provides
    fun provideGradeDao(database: StudentTrackingDatabase): GradeDao {
        return database.gradeDao()
    }
    
    @Provides
    fun provideScheduleDao(database: StudentTrackingDatabase): ScheduleDao {
        return database.scheduleDao()
    }
    
    @Provides
    fun provideIoTDao(database: StudentTrackingDatabase): IoTDao {
        return database.iotDao()
    }
} 