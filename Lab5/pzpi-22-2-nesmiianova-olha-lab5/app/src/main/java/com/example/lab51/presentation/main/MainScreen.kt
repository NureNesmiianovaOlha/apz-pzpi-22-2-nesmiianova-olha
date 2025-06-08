package com.example.lab51.presentation.main

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.lab51.presentation.dashboard.DashboardScreen
import com.example.lab51.presentation.grades.GradesScreen
import com.example.lab51.presentation.schedule.ScheduleScreen
import com.example.lab51.presentation.iot.IoTScreen
import com.example.lab51.presentation.profile.ProfileScreen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    onNavigateToLogin: () -> Unit = {}
) {
    val navController = rememberNavController()
    
    val items = listOf(
        BottomNavigationItem(
            route = "dashboard",
            title = "Dashboard",
            icon = Icons.Default.Home
        ),
        BottomNavigationItem(
            route = "grades",
            title = "Grades",
            icon = Icons.Default.School
        ),
        BottomNavigationItem(
            route = "schedule",
            title = "Schedule",
            icon = Icons.Default.Schedule
        ),
        BottomNavigationItem(
            route = "iot",
            title = "IoT",
            icon = Icons.Default.Sensors
        ),
        BottomNavigationItem(
            route = "profile",
            title = "Profile",
            icon = Icons.Default.Person
        )
    )
    
    Scaffold(
        bottomBar = {
            NavigationBar {
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentDestination = navBackStackEntry?.destination
                
                items.forEach { item ->
                    NavigationBarItem(
                        icon = { Icon(item.icon, contentDescription = item.title) },
                        label = { Text(item.title) },
                        selected = currentDestination?.hierarchy?.any { it.route == item.route } == true,
                        onClick = {
                            navController.navigate(item.route) {
                                popUpTo(navController.graph.findStartDestination().id) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = "dashboard",
            modifier = Modifier.padding(innerPadding)
        ) {
            composable("dashboard") {
                DashboardScreen()
            }
            composable("grades") {
                GradesScreen()
            }
            composable("schedule") {
                ScheduleScreen()
            }
            composable("iot") {
                IoTScreen()
            }
            composable("profile") {
                ProfileScreen(
                    onNavigateToLogin = onNavigateToLogin
                )
            }
        }
    }
}

data class BottomNavigationItem(
    val route: String,
    val title: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
) 