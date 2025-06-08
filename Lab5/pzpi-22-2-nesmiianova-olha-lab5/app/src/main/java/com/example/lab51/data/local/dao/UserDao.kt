package com.example.lab51.data.local.dao

import androidx.room.*
import com.example.lab51.data.model.User
import com.example.lab51.data.model.UserRole
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {
    
    @Query("SELECT * FROM users WHERE id = :userId")
    suspend fun getUserById(userId: String): User?
    
    @Query("SELECT * FROM users WHERE email = :email")
    suspend fun getUserByEmail(email: String): User?
    
    @Query("SELECT * FROM users WHERE role = :role")
    fun getUsersByRole(role: UserRole): Flow<List<User>>
    
    @Query("SELECT * FROM users WHERE groupId = :groupId")
    fun getStudentsByGroup(groupId: String): Flow<List<User>>
    
    @Query("SELECT * FROM users WHERE department = :department AND role = :role")
    fun getTeachersByDepartment(department: String, role: UserRole = UserRole.TEACHER): Flow<List<User>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: User)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUsers(users: List<User>)
    
    @Update
    suspend fun updateUser(user: User)
    
    @Delete
    suspend fun deleteUser(user: User)
    
    @Query("DELETE FROM users WHERE id = :userId")
    suspend fun deleteUserById(userId: String)
    
    @Query("SELECT * FROM users")
    fun getAllUsers(): Flow<List<User>>
} 