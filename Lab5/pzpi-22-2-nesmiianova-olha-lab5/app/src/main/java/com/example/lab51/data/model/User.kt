package com.example.lab51.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
@Entity(tableName = "users")
data class User(
    @PrimaryKey val id: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val role: UserRole,
    val groupId: String? = null, // For students
    val department: String? = null, // For teachers
    val profileImageUrl: String? = null,
    val createdAt: Long = System.currentTimeMillis(),
    val isActive: Boolean = true
) : Parcelable

enum class UserRole {
    STUDENT,
    TEACHER,
    ADMIN
} 