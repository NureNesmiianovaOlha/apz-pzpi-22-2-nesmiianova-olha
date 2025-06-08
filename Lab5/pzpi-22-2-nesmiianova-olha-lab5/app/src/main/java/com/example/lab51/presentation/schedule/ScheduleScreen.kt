package com.example.lab51.presentation.schedule

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
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ScheduleScreen() {
    var selectedDay by remember { mutableStateOf(0) }
    val daysOfWeek = listOf("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Schedule",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        
        // Day selector
        ScrollableTabRow(
            selectedTabIndex = selectedDay,
            modifier = Modifier.padding(bottom = 16.dp)
        ) {
            daysOfWeek.forEachIndexed { index, day ->
                Tab(
                    selected = selectedDay == index,
                    onClick = { selectedDay = index },
                    text = { Text(day.take(3)) }
                )
            }
        }
        
        // Current date
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    Icons.Default.Today,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onPrimaryContainer
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "${daysOfWeek[selectedDay]}, ${getCurrentDate()}",
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }
        
        // Schedule items
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(getScheduleForDay(selectedDay)) { scheduleItem ->
                ScheduleCard(scheduleItem = scheduleItem)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ScheduleCard(scheduleItem: ScheduleItem) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Time column
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.width(80.dp)
            ) {
                Text(
                    text = scheduleItem.startTime,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
                Text(
                    text = scheduleItem.endTime,
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            // Subject info
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = scheduleItem.subject,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 16.sp
                )
                Text(
                    text = scheduleItem.type,
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.primary
                )
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.LocationOn,
                        contentDescription = null,
                        modifier = Modifier.size(16.dp),
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = scheduleItem.classroom,
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(start = 4.dp)
                    )
                }
                if (scheduleItem.teacher.isNotEmpty()) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            Icons.Default.Person,
                            contentDescription = null,
                            modifier = Modifier.size(16.dp),
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = scheduleItem.teacher,
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.padding(start = 4.dp)
                        )
                    }
                }
            }
            
            // Status indicator
            when (scheduleItem.status) {
                ScheduleStatus.UPCOMING -> Icon(
                    Icons.Default.Schedule,
                    contentDescription = "Upcoming",
                    tint = MaterialTheme.colorScheme.primary
                )
                ScheduleStatus.IN_PROGRESS -> Icon(
                    Icons.Default.PlayArrow,
                    contentDescription = "In Progress",
                    tint = MaterialTheme.colorScheme.tertiary
                )
                ScheduleStatus.COMPLETED -> Icon(
                    Icons.Default.CheckCircle,
                    contentDescription = "Completed",
                    tint = MaterialTheme.colorScheme.primary
                )
                ScheduleStatus.CANCELLED -> Icon(
                    Icons.Default.Cancel,
                    contentDescription = "Cancelled",
                    tint = MaterialTheme.colorScheme.error
                )
            }
        }
    }
}

data class ScheduleItem(
    val subject: String,
    val type: String,
    val startTime: String,
    val endTime: String,
    val classroom: String,
    val teacher: String,
    val status: ScheduleStatus
)

enum class ScheduleStatus {
    UPCOMING,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}

fun getCurrentDate(): String {
    val dateFormat = SimpleDateFormat("MMM dd, yyyy", Locale.getDefault())
    return dateFormat.format(Date())
}

fun getScheduleForDay(dayIndex: Int): List<ScheduleItem> {
    val schedules = listOf(
        // Monday
        listOf(
            ScheduleItem("Mathematics", "Lecture", "09:00", "10:30", "Room 101", "Dr. Smith", ScheduleStatus.UPCOMING),
            ScheduleItem("Physics", "Lab", "11:00", "12:30", "Lab 205", "Prof. Johnson", ScheduleStatus.UPCOMING),
            ScheduleItem("Computer Science", "Seminar", "14:00", "15:30", "Room 301", "Dr. Brown", ScheduleStatus.UPCOMING)
        ),
        // Tuesday
        listOf(
            ScheduleItem("Chemistry", "Lecture", "08:30", "10:00", "Room 102", "Prof. Davis", ScheduleStatus.UPCOMING),
            ScheduleItem("Mathematics", "Practice", "10:30", "12:00", "Room 101", "Dr. Smith", ScheduleStatus.UPCOMING),
            ScheduleItem("Physics", "Lecture", "13:00", "14:30", "Room 201", "Prof. Johnson", ScheduleStatus.UPCOMING)
        ),
        // Wednesday
        listOf(
            ScheduleItem("Computer Science", "Lab", "09:00", "11:00", "Lab 305", "Dr. Brown", ScheduleStatus.UPCOMING),
            ScheduleItem("Chemistry", "Lab", "12:00", "13:30", "Lab 102", "Prof. Davis", ScheduleStatus.UPCOMING)
        ),
        // Thursday
        listOf(
            ScheduleItem("Mathematics", "Lecture", "09:00", "10:30", "Room 101", "Dr. Smith", ScheduleStatus.UPCOMING),
            ScheduleItem("Physics", "Practice", "11:00", "12:30", "Room 201", "Prof. Johnson", ScheduleStatus.UPCOMING),
            ScheduleItem("Computer Science", "Lecture", "14:00", "15:30", "Room 301", "Dr. Brown", ScheduleStatus.UPCOMING)
        ),
        // Friday
        listOf(
            ScheduleItem("Chemistry", "Practice", "08:30", "10:00", "Room 102", "Prof. Davis", ScheduleStatus.UPCOMING),
            ScheduleItem("Mathematics", "Seminar", "10:30", "12:00", "Room 101", "Dr. Smith", ScheduleStatus.UPCOMING)
        ),
        // Saturday & Sunday (empty)
        emptyList(),
        emptyList()
    )
    
    return schedules.getOrElse(dayIndex) { emptyList() }
} 