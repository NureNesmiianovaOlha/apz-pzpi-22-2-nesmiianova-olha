package com.example.lab51.presentation.iot

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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
import com.example.lab51.data.model.SensorType

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun IoTScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "IoT Monitoring",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Sensor overview
            item {
                Text(
                    text = "Sensor Overview",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(getSensorOverview()) { sensor ->
                        SensorOverviewCard(sensor = sensor)
                    }
                }
            }
            
            // Classroom environments
            item {
                Text(
                    text = "Classroom Environment",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }
            
            items(getClassroomData()) { classroom ->
                ClassroomCard(classroom = classroom)
            }
            
            // Attendance tracking
            item {
                Text(
                    text = "Attendance Tracking",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }
            
            items(getAttendanceData()) { attendance ->
                AttendanceCard(attendance = attendance)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SensorOverviewCard(sensor: SensorOverview) {
    Card(
        modifier = Modifier.width(140.dp),
        colors = CardDefaults.cardColors(
            containerColor = when (sensor.status) {
                SensorStatus.ONLINE -> MaterialTheme.colorScheme.primaryContainer
                SensorStatus.WARNING -> MaterialTheme.colorScheme.secondaryContainer
                SensorStatus.OFFLINE -> MaterialTheme.colorScheme.errorContainer
            }
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                imageVector = sensor.icon,
                contentDescription = null,
                modifier = Modifier.size(32.dp),
                tint = when (sensor.status) {
                    SensorStatus.ONLINE -> MaterialTheme.colorScheme.onPrimaryContainer
                    SensorStatus.WARNING -> MaterialTheme.colorScheme.onSecondaryContainer
                    SensorStatus.OFFLINE -> MaterialTheme.colorScheme.onErrorContainer
                }
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = sensor.type,
                fontWeight = FontWeight.SemiBold,
                color = when (sensor.status) {
                    SensorStatus.ONLINE -> MaterialTheme.colorScheme.onPrimaryContainer
                    SensorStatus.WARNING -> MaterialTheme.colorScheme.onSecondaryContainer
                    SensorStatus.OFFLINE -> MaterialTheme.colorScheme.onErrorContainer
                }
            )
            Text(
                text = "${sensor.activeCount}/${sensor.totalCount}",
                fontSize = 12.sp,
                color = when (sensor.status) {
                    SensorStatus.ONLINE -> MaterialTheme.colorScheme.onPrimaryContainer
                    SensorStatus.WARNING -> MaterialTheme.colorScheme.onSecondaryContainer
                    SensorStatus.OFFLINE -> MaterialTheme.colorScheme.onErrorContainer
                }
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ClassroomCard(classroom: ClassroomData) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = classroom.name,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 16.sp
                )
                Icon(
                    when (classroom.status) {
                        ClassroomStatus.OCCUPIED -> Icons.Default.Group
                        ClassroomStatus.AVAILABLE -> Icons.Default.CheckCircle
                        ClassroomStatus.MAINTENANCE -> Icons.Default.Build
                    },
                    contentDescription = null,
                    tint = when (classroom.status) {
                        ClassroomStatus.OCCUPIED -> MaterialTheme.colorScheme.primary
                        ClassroomStatus.AVAILABLE -> MaterialTheme.colorScheme.tertiary
                        ClassroomStatus.MAINTENANCE -> MaterialTheme.colorScheme.error
                    }
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                EnvironmentMetric(
                    icon = Icons.Default.Thermostat,
                    label = "Temperature",
                    value = "${classroom.temperature}°C"
                )
                EnvironmentMetric(
                    icon = Icons.Default.WaterDrop,
                    label = "Humidity",
                    value = "${classroom.humidity}%"
                )
                EnvironmentMetric(
                    icon = Icons.Default.People,
                    label = "Occupancy",
                    value = "${classroom.occupancy}"
                )
            }
        }
    }
}

@Composable
fun EnvironmentMetric(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    value: String
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(
            icon,
            contentDescription = null,
            modifier = Modifier.size(20.dp),
            tint = MaterialTheme.colorScheme.primary
        )
        Text(
            text = value,
            fontWeight = FontWeight.Bold,
            fontSize = 14.sp
        )
        Text(
            text = label,
            fontSize = 10.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AttendanceCard(attendance: AttendanceData) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                Icons.Default.Schedule,
                contentDescription = null,
                modifier = Modifier.size(24.dp),
                tint = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.width(16.dp))
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "${attendance.subject} - ${attendance.classroom}",
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = attendance.time,
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            Column(
                horizontalAlignment = Alignment.End
            ) {
                Text(
                    text = "${attendance.presentCount}/${attendance.totalCount}",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
                Text(
                    text = "Present",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

data class SensorOverview(
    val type: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector,
    val activeCount: Int,
    val totalCount: Int,
    val status: SensorStatus
)

data class ClassroomData(
    val name: String,
    val temperature: Int,
    val humidity: Int,
    val occupancy: Int,
    val status: ClassroomStatus
)

data class AttendanceData(
    val subject: String,
    val classroom: String,
    val time: String,
    val presentCount: Int,
    val totalCount: Int
)

enum class SensorStatus {
    ONLINE,
    WARNING,
    OFFLINE
}

enum class ClassroomStatus {
    OCCUPIED,
    AVAILABLE,
    MAINTENANCE
}

fun getSensorOverview(): List<SensorOverview> {
    return listOf(
        SensorOverview("Temperature", Icons.Default.Thermostat, 15, 16, SensorStatus.ONLINE),
        SensorOverview("Motion", Icons.Default.DirectionsRun, 12, 14, SensorStatus.WARNING),
        SensorOverview("Door", Icons.Default.MeetingRoom, 8, 8, SensorStatus.ONLINE),
        SensorOverview("Air Quality", Icons.Default.Air, 10, 12, SensorStatus.WARNING)
    )
}

fun getClassroomData(): List<ClassroomData> {
    return listOf(
        ClassroomData("Room 101", 22, 45, 28, ClassroomStatus.OCCUPIED),
        ClassroomData("Lab 205", 20, 50, 0, ClassroomStatus.AVAILABLE),
        ClassroomData("Room 301", 23, 48, 15, ClassroomStatus.OCCUPIED),
        ClassroomData("Lab 102", 19, 55, 0, ClassroomStatus.MAINTENANCE)
    )
}

fun getAttendanceData(): List<AttendanceData> {
    return listOf(
        AttendanceData("Mathematics", "Room 101", "09:00 - 10:30", 25, 28),
        AttendanceData("Physics Lab", "Lab 205", "11:00 - 12:30", 22, 25),
        AttendanceData("Computer Science", "Room 301", "14:00 - 15:30", 18, 20)
    )
} 