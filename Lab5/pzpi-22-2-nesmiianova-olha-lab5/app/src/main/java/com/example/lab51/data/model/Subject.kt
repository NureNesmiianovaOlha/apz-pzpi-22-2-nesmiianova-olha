package com.example.lab51.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
@Entity(tableName = "subjects")
data class Subject(
    @PrimaryKey val id: String,
    val name: String,
    val code: String,
    val teacherId: String,
    val credits: Int,
    val semester: Int,
    val year: Int,
    val description: String? = null,
    val isActive: Boolean = true
) : Parcelable 