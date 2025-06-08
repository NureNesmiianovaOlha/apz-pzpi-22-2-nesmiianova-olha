package com.example.lab51.presentation.dashboard

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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen() {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text(
                text = "Dashboard",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 8.dp)
            )
        }
        
        // Quick stats
        item {
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                items(getQuickStats()) { stat ->
                    QuickStatCard(stat = stat)
                }
            }
        }
        
        // Recent activity
        item {
            Text(
                text = "Recent Activity",
                fontSize = 20.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(vertical = 8.dp)
            )
        }
        
        items(getRecentActivities()) { activity ->
            ActivityCard(activity = activity)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun QuickStatCard(stat: QuickStat) {
    Card(
        modifier = Modifier.width(150.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                imageVector = stat.icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onPrimaryContainer,
                modifier = Modifier.size(32.dp)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = stat.value,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
            Text(
                text = stat.label,
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ActivityCard(activity: RecentActivity) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = activity.icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(24.dp)
            )
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = activity.title,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = activity.description,
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Text(
                text = activity.time,
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

data class QuickStat(
    val value: String,
    val label: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
)

data class RecentActivity(
    val title: String,
    val description: String,
    val time: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
)

fun getQuickStats(): List<QuickStat> {
    return listOf(
        QuickStat("4.2", "Average Grade", Icons.Default.School),
        QuickStat("95%", "Attendance", Icons.Default.CheckCircle),
        QuickStat("6", "Subjects", Icons.Default.MenuBook),
        QuickStat("2", "Next Classes", Icons.Default.Schedule)
    )
}

fun getRecentActivities(): List<RecentActivity> {
    return listOf(
        RecentActivity(
            "New Grade Added",
            "Mathematics - Test: 85/100",
            "2h ago",
            Icons.Default.School
        ),
        RecentActivity(
            "Attendance Marked",
            "Physics Lab - Present",
            "4h ago",
            Icons.Default.CheckCircle
        ),
        RecentActivity(
            "IoT Alert",
            "Room 101 - Temperature: 22°C",
            "6h ago",
            Icons.Default.Thermostat
        ),
        RecentActivity(
            "Schedule Updated",
            "Chemistry lecture moved to 14:00",
            "1d ago",
            Icons.Default.Update
        )
    )
} 