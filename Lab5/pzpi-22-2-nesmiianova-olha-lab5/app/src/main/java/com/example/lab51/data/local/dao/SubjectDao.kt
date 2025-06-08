package com.example.lab51.data.local.dao

import androidx.room.*
import com.example.lab51.data.model.Subject
import kotlinx.coroutines.flow.Flow

@Dao
interface SubjectDao {
    
    @Query("SELECT * FROM subjects WHERE id = :subjectId")
    suspend fun getSubjectById(subjectId: String): Subject?
    
    @Query("SELECT * FROM subjects WHERE teacherId = :teacherId")
    fun getSubjectsByTeacher(teacherId: String): Flow<List<Subject>>
    
    @Query("SELECT * FROM subjects WHERE semester = :semester AND year = :year")
    fun getSubjectsBySemester(semester: Int, year: Int): Flow<List<Subject>>
    
    @Query("SELECT * FROM subjects WHERE isActive = 1")
    fun getActiveSubjects(): Flow<List<Subject>>
    
    @Query("SELECT * FROM subjects")
    fun getAllSubjects(): Flow<List<Subject>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSubject(subject: Subject)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSubjects(subjects: List<Subject>)
    
    @Update
    suspend fun updateSubject(subject: Subject)
    
    @Delete
    suspend fun deleteSubject(subject: Subject)
    
    @Query("DELETE FROM subjects WHERE id = :subjectId")
    suspend fun deleteSubjectById(subjectId: String)
} 