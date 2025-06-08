package com.example.lab51.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
@Entity(tableName = "grades")
data class Grade(
    @PrimaryKey val id: String,
    val studentId: String,
    val subjectId: String,
    val teacherId: String,
    val value: Double,
    val maxValue: Double,
    val type: GradeType,
    val title: String,
    val description: String? = null,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
) : Parcelable

enum class GradeType {
    HOMEWORK,
    TEST,
    EXAM,
    PROJECT,
    ATTENDANCE,
    OTHER
} 