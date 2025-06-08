package com.example.lab51.data.local.dao

import androidx.room.*
import com.example.lab51.data.model.Schedule
import com.example.lab51.data.model.LessonType
import kotlinx.coroutines.flow.Flow

@Dao
interface ScheduleDao {
    
    @Query("SELECT * FROM schedule WHERE id = :scheduleId")
    suspend fun getScheduleById(scheduleId: String): Schedule?
    
    @Query("SELECT * FROM schedule WHERE groupId = :groupId")
    fun getScheduleByGroup(groupId: String): Flow<List<Schedule>>
    
    @Query("SELECT * FROM schedule WHERE teacherId = :teacherId")
    fun getScheduleByTeacher(teacherId: String): Flow<List<Schedule>>
    
    @Query("SELECT * FROM schedule WHERE dayOfWeek = :dayOfWeek")
    fun getScheduleByDay(dayOfWeek: Int): Flow<List<Schedule>>
    
    @Query("SELECT * FROM schedule WHERE groupId = :groupId AND dayOfWeek = :dayOfWeek")
    fun getScheduleByGroupAndDay(groupId: String, dayOfWeek: Int): Flow<List<Schedule>>
    
    @Query("SELECT * FROM schedule WHERE subjectId = :subjectId")
    fun getScheduleBySubject(subjectId: String): Flow<List<Schedule>>
    
    @Query("SELECT * FROM schedule WHERE classroom = :classroom")
    fun getScheduleByClassroom(classroom: String): Flow<List<Schedule>>
    
    @Query("SELECT * FROM schedule WHERE lessonType = :lessonType")
    fun getScheduleByLessonType(lessonType: LessonType): Flow<List<Schedule>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSchedule(schedule: Schedule)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSchedules(schedules: List<Schedule>)
    
    @Update
    suspend fun updateSchedule(schedule: Schedule)
    
    @Delete
    suspend fun deleteSchedule(schedule: Schedule)
    
    @Query("DELETE FROM schedule WHERE id = :scheduleId")
    suspend fun deleteScheduleById(scheduleId: String)
    
    @Query("SELECT * FROM schedule")
    fun getAllSchedules(): Flow<List<Schedule>>
} 