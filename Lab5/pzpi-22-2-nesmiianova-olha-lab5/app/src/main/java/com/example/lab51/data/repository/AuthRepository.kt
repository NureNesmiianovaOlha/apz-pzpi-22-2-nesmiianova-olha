package com.example.lab51.data.repository

import com.example.lab51.data.local.dao.UserDao
import com.example.lab51.data.model.User
import com.example.lab51.data.model.UserRole
import com.example.lab51.data.remote.api.StudentTrackingApi
import com.example.lab51.data.remote.dto.LoginRequest
import com.example.lab51.data.remote.dto.RegisterRequest
import com.example.lab51.utils.Resource
// import com.google.firebase.auth.FirebaseAuth
// import com.google.firebase.auth.FirebaseUser
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
// import kotlinx.coroutines.tasks.await
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepository @Inject constructor(
    private val api: StudentTrackingApi,
    private val userDao: UserDao
    // private val firebaseAuth: FirebaseAuth // Temporarily disabled
) {
    
    // Mock login state management
    private var _isLoggedIn = false
    private var _currentUser: User? = null
    
    // Temporary mock implementation for development
    fun loginWithEmail(email: String, password: String): Flow<Resource<User>> = flow {
        try {
            emit(Resource.Loading())
            
            // Determine user role based on email
            val role = when {
                email.contains("teacher") || email.contains("преподаватель") -> UserRole.TEACHER
                email.contains("admin") || email.contains("администратор") -> UserRole.ADMIN
                else -> UserRole.STUDENT
            }
            
            // Create mock user based on role
            val mockUser = when (role) {
                UserRole.STUDENT -> User(
                    id = "student_${email.hashCode()}",
                    email = email,
                    firstName = "Иван",
                    lastName = "Студентов",
                    role = UserRole.STUDENT,
                    groupId = "КС-201",
                    department = null
                )
                UserRole.TEACHER -> User(
                    id = "teacher_${email.hashCode()}",
                    email = email,
                    firstName = "Мария",
                    lastName = "Преподавателевна",
                    role = UserRole.TEACHER,
                    groupId = null,
                    department = "Кафедра информатики"
                )
                UserRole.ADMIN -> User(
                    id = "admin_${email.hashCode()}",
                    email = email,
                    firstName = "Петр",
                    lastName = "Администраторов",
                    role = UserRole.ADMIN,
                    groupId = null,
                    department = "Администрация"
                )
            }
            
            // Save user locally
            userDao.insertUser(mockUser)
            
            // Update login state
            _isLoggedIn = true
            _currentUser = mockUser
            
            emit(Resource.Success(mockUser))
        } catch (e: Exception) {
            emit(Resource.Error(e.message ?: "Unknown error occurred"))
        }
    }
    
    fun registerWithEmail(
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        role: String,
        groupId: String? = null,
        department: String? = null
    ): Flow<Resource<User>> = flow {
        try {
            emit(Resource.Loading())
            
            // Mock user for development
            val mockUser = User(
                id = "user_${email.hashCode()}",
                email = email,
                firstName = firstName,
                lastName = lastName,
                role = UserRole.valueOf(role),
                groupId = groupId,
                department = department
            )
            
            // Save user locally
            userDao.insertUser(mockUser)
            
            // Update login state
            _isLoggedIn = true
            _currentUser = mockUser
            
            emit(Resource.Success(mockUser))
        } catch (e: Exception) {
            emit(Resource.Error(e.message ?: "Unknown error occurred"))
        }
    }
    
    suspend fun logout() {
        // Clear login state
        _isLoggedIn = false
        _currentUser = null
        // Note: In real implementation, we might want to clear local data
    }
    
    // Mock implementation - returns current mock user
    fun getCurrentUser(): Any? = _currentUser
    
    suspend fun getCurrentUserData(): User? {
        return _currentUser
    }
    
    fun isUserLoggedIn(): Boolean = _isLoggedIn
    
    /*
    // Original Firebase implementation - commented out for now
    fun loginWithEmail(email: String, password: String): Flow<Resource<User>> = flow {
        try {
            emit(Resource.Loading())
            
            // First try Firebase authentication
            val firebaseResult = firebaseAuth.signInWithEmailAndPassword(email, password).await()
            val firebaseUser = firebaseResult.user
            
            if (firebaseUser != null) {
                // Then get user data from our API
                val response = api.login(LoginRequest(email, password))
                if (response.isSuccessful && response.body() != null) {
                    val authResponse = response.body()!!
                    val user = authResponse.user
                    
                    // Save user locally
                    userDao.insertUser(user)
                    
                    emit(Resource.Success(user))
                } else {
                    emit(Resource.Error("Failed to get user data"))
                }
            } else {
                emit(Resource.Error("Firebase authentication failed"))
            }
        } catch (e: Exception) {
            emit(Resource.Error(e.message ?: "Unknown error occurred"))
        }
    }
    */
} 