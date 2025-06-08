package com.example.lab51.data.remote.api

import com.example.lab51.data.model.*
import com.example.lab51.data.remote.dto.*
import retrofit2.Response
import retrofit2.http.*

interface StudentTrackingApi {
    
    // Authentication
    @POST("auth/login")
    suspend fun login(@Body loginRequest: LoginRequest): Response<AuthResponse>
    
    @POST("auth/register")
    suspend fun register(@Body registerRequest: RegisterRequest): Response<AuthResponse>
    
    @POST("auth/refresh")
    suspend fun refreshToken(@Body refreshRequest: RefreshTokenRequest): Response<AuthResponse>
    
    // Users
    @GET("users/profile")
    suspend fun getUserProfile(@Header("Authorization") token: String): Response<User>
    
    @PUT("users/profile")
    suspend fun updateUserProfile(
        @Header("Authorization") token: String,
        @Body user: User
    ): Response<User>
    
    @GET("users/students")
    suspend fun getStudents(@Header("Authorization") token: String): Response<List<User>>
    
    @GET("users/teachers")
    suspend fun getTeachers(@Header("Authorization") token: String): Response<List<User>>
    
    // Subjects
    @GET("subjects")
    suspend fun getSubjects(@Header("Authorization") token: String): Response<List<Subject>>
    
    @GET("subjects/{id}")
    suspend fun getSubject(
        @Header("Authorization") token: String,
        @Path("id") subjectId: String
    ): Response<Subject>
    
    @POST("subjects")
    suspend fun createSubject(
        @Header("Authorization") token: String,
        @Body subject: Subject
    ): Response<Subject>
    
    @PUT("subjects/{id}")
    suspend fun updateSubject(
        @Header("Authorization") token: String,
        @Path("id") subjectId: String,
        @Body subject: Subject
    ): Response<Subject>
    
    // Grades
    @GET("grades/student/{studentId}")
    suspend fun getStudentGrades(
        @Header("Authorization") token: String,
        @Path("studentId") studentId: String
    ): Response<List<Grade>>
    
    @GET("grades/subject/{subjectId}")
    suspend fun getSubjectGrades(
        @Header("Authorization") token: String,
        @Path("subjectId") subjectId: String
    ): Response<List<Grade>>
    
    @POST("grades")
    suspend fun createGrade(
        @Header("Authorization") token: String,
        @Body grade: Grade
    ): Response<Grade>
    
    @PUT("grades/{id}")
    suspend fun updateGrade(
        @Header("Authorization") token: String,
        @Path("id") gradeId: String,
        @Body grade: Grade
    ): Response<Grade>
    
    @DELETE("grades/{id}")
    suspend fun deleteGrade(
        @Header("Authorization") token: String,
        @Path("id") gradeId: String
    ): Response<Unit>
    
    // Schedule
    @GET("schedule/group/{groupId}")
    suspend fun getGroupSchedule(
        @Header("Authorization") token: String,
        @Path("groupId") groupId: String
    ): Response<List<Schedule>>
    
    @GET("schedule/teacher/{teacherId}")
    suspend fun getTeacherSchedule(
        @Header("Authorization") token: String,
        @Path("teacherId") teacherId: String
    ): Response<List<Schedule>>
    
    @POST("schedule")
    suspend fun createSchedule(
        @Header("Authorization") token: String,
        @Body schedule: Schedule
    ): Response<Schedule>
    
    // IoT Data
    @GET("iot/sensors")
    suspend fun getSensorData(
        @Header("Authorization") token: String,
        @Query("location") location: String? = null,
        @Query("type") type: String? = null,
        @Query("limit") limit: Int = 100
    ): Response<List<IoTSensorData>>
    
    @POST("iot/sensors")
    suspend fun postSensorData(
        @Header("Authorization") token: String,
        @Body data: IoTSensorData
    ): Response<IoTSensorData>
    
    // Attendance
    @GET("attendance/student/{studentId}")
    suspend fun getStudentAttendance(
        @Header("Authorization") token: String,
        @Path("studentId") studentId: String
    ): Response<List<AttendanceRecord>>
    
    @GET("attendance/schedule/{scheduleId}")
    suspend fun getScheduleAttendance(
        @Header("Authorization") token: String,
        @Path("scheduleId") scheduleId: String
    ): Response<List<AttendanceRecord>>
    
    @POST("attendance")
    suspend fun markAttendance(
        @Header("Authorization") token: String,
        @Body attendance: AttendanceRecord
    ): Response<AttendanceRecord>
} 