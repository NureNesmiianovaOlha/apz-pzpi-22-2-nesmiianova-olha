package com.example.lab51.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
@Entity(tableName = "schedule")
data class Schedule(
    @PrimaryKey val id: String,
    val subjectId: String,
    val groupId: String,
    val teacherId: String,
    val dayOfWeek: Int, // 1-7 (Monday-Sunday)
    val startTime: String, // HH:mm format
    val endTime: String, // HH:mm format
    val classroom: String,
    val lessonType: LessonType,
    val weekType: WeekType = WeekType.BOTH // Для чисельника/знаменника
) : Parcelable

enum class LessonType {
    LECTURE,
    SEMINAR,
    LAB,
    PRACTICE
}

enum class WeekType {
    ODD,    // Чисельник
    EVEN,   // Знаменник  
    BOTH    // Кожен тиждень
} 