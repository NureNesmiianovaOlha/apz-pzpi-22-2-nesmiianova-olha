package com.example.lab51.presentation.grades

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.lab51.data.model.Grade
import com.example.lab51.data.model.GradeType

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GradesScreen() {
    var selectedSubject by remember { mutableStateOf("All") }
    val subjects = listOf("All", "Mathematics", "Physics", "Chemistry", "Computer Science")
    var showFilterDialog by remember { mutableStateOf(false) }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Header with filter
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Grades",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
            
            IconButton(onClick = { showFilterDialog = true }) {
                Icon(Icons.Default.FilterList, contentDescription = "Filter")
            }
        }
        
        // Average grade card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    Icons.Default.TrendingUp,
                    contentDescription = null,
                    modifier = Modifier.size(32.dp),
                    tint = MaterialTheme.colorScheme.onPrimaryContainer
                )
                Spacer(modifier = Modifier.width(16.dp))
                Column {
                    Text(
                        text = "Overall Average",
                        fontWeight = FontWeight.SemiBold,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                    Text(
                        text = "4.2 / 5.0",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
            }
        }
        
        // Grades list
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(getSampleGrades()) { grade ->
                GradeCard(grade = grade)
            }
        }
    }
    
    // Filter dialog
    if (showFilterDialog) {
        AlertDialog(
            onDismissRequest = { showFilterDialog = false },
            title = { Text("Filter by Subject") },
            text = {
                LazyColumn {
                    items(subjects) { subject ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            RadioButton(
                                selected = selectedSubject == subject,
                                onClick = { 
                                    selectedSubject = subject
                                    showFilterDialog = false
                                }
                            )
                            Text(
                                text = subject,
                                modifier = Modifier.padding(start = 8.dp)
                            )
                        }
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showFilterDialog = false }) {
                    Text("OK")
                }
            }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GradeCard(grade: GradeData) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = grade.subject,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 16.sp
                    )
                    Text(
                        text = grade.title,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = grade.type,
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
                
                Column(
                    horizontalAlignment = Alignment.End
                ) {
                    Text(
                        text = "${grade.value}/${grade.maxValue}",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = getGradeColor(grade.value, grade.maxValue)
                    )
                    Text(
                        text = grade.date,
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            if (grade.description != null) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = grade.description,
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
fun getGradeColor(value: Double, maxValue: Double): androidx.compose.ui.graphics.Color {
    val percentage = value / maxValue
    return when {
        percentage >= 0.8 -> MaterialTheme.colorScheme.primary
        percentage >= 0.6 -> MaterialTheme.colorScheme.tertiary
        else -> MaterialTheme.colorScheme.error
    }
}

data class GradeData(
    val subject: String,
    val title: String,
    val type: String,
    val value: Double,
    val maxValue: Double,
    val date: String,
    val description: String? = null
)

fun getSampleGrades(): List<GradeData> {
    return listOf(
        GradeData(
            subject = "Mathematics",
            title = "Calculus Test",
            type = "TEST",
            value = 85.0,
            maxValue = 100.0,
            date = "Nov 15, 2023",
            description = "Integration and differentiation"
        ),
        GradeData(
            subject = "Physics",
            title = "Lab Report #3",
            type = "LAB",
            value = 92.0,
            maxValue = 100.0,
            date = "Nov 12, 2023",
            description = "Electromagnetic induction experiment"
        ),
        GradeData(
            subject = "Computer Science",
            title = "Project 2",
            type = "PROJECT",
            value = 88.0,
            maxValue = 100.0,
            date = "Nov 10, 2023",
            description = "Web application development"
        ),
        GradeData(
            subject = "Chemistry",
            title = "Quiz 4",
            type = "QUIZ",
            value = 76.0,
            maxValue = 100.0,
            date = "Nov 8, 2023"
        ),
        GradeData(
            subject = "Mathematics",
            title = "Homework 5",
            type = "HOMEWORK",
            value = 95.0,
            maxValue = 100.0,
            date = "Nov 5, 2023",
            description = "Linear algebra problems"
        )
    )
} 