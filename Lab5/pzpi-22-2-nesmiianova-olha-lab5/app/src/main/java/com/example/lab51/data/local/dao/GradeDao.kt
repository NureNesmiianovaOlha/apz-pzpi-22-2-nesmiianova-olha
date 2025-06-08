package com.example.lab51.data.local.dao

import androidx.room.*
import com.example.lab51.data.model.Grade
import com.example.lab51.data.model.GradeType
import kotlinx.coroutines.flow.Flow

@Dao
interface GradeDao {
    
    @Query("SELECT * FROM grades WHERE studentId = :studentId")
    fun getGradesByStudent(studentId: String): Flow<List<Grade>>
    
    @Query("SELECT * FROM grades WHERE studentId = :studentId AND subjectId = :subjectId")
    fun getGradesByStudentAndSubject(studentId: String, subjectId: String): Flow<List<Grade>>
    
    @Query("SELECT * FROM grades WHERE subjectId = :subjectId")
    fun getGradesBySubject(subjectId: String): Flow<List<Grade>>
    
    @Query("SELECT * FROM grades WHERE teacherId = :teacherId")
    fun getGradesByTeacher(teacherId: String): Flow<List<Grade>>
    
    @Query("SELECT * FROM grades WHERE type = :type")
    fun getGradesByType(type: GradeType): Flow<List<Grade>>
    
    @Query("SELECT AVG(value) FROM grades WHERE studentId = :studentId AND subjectId = :subjectId")
    suspend fun getAverageGrade(studentId: String, subjectId: String): Double?
    
    @Query("""
        SELECT AVG(value) FROM grades 
        WHERE studentId = :studentId 
        AND createdAt BETWEEN :startDate AND :endDate
    """)
    suspend fun getAverageGradeInPeriod(studentId: String, startDate: Long, endDate: Long): Double?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertGrade(grade: Grade)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertGrades(grades: List<Grade>)
    
    @Update
    suspend fun updateGrade(grade: Grade)
    
    @Delete
    suspend fun deleteGrade(grade: Grade)
    
    @Query("DELETE FROM grades WHERE id = :gradeId")
    suspend fun deleteGradeById(gradeId: String)
    
    @Query("SELECT * FROM grades WHERE id = :gradeId")
    suspend fun getGradeById(gradeId: String): Grade?
} 