package com.example.lab51.presentation.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.lab51.data.model.User
import com.example.lab51.data.repository.AuthRepository
import com.example.lab51.utils.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {
    
    private val _authState = MutableStateFlow<Resource<User>?>(null)
    val authState: StateFlow<Resource<User>?> = _authState.asStateFlow()
    
    private val _isUserLoggedIn = MutableStateFlow(false)
    val isUserLoggedIn: StateFlow<Boolean> = _isUserLoggedIn.asStateFlow()
    
    init {
        checkUserLoggedIn()
    }
    
    private fun checkUserLoggedIn() {
        _isUserLoggedIn.value = authRepository.isUserLoggedIn()
    }
    
    fun login(email: String, password: String) {
        viewModelScope.launch {
            authRepository.loginWithEmail(email, password).collect { result ->
                _authState.value = result
                if (result is Resource.Success) {
                    _isUserLoggedIn.value = true
                }
            }
        }
    }
    
    fun register(
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        role: String,
        groupId: String? = null,
        department: String? = null
    ) {
        viewModelScope.launch {
            authRepository.registerWithEmail(
                email, password, firstName, lastName, role, groupId, department
            ).collect { result ->
                _authState.value = result
                if (result is Resource.Success) {
                    _isUserLoggedIn.value = true
                }
            }
        }
    }
    
    fun logout() {
        viewModelScope.launch {
            authRepository.logout()
            _isUserLoggedIn.value = false
            _authState.value = null
        }
    }
    
    fun clearAuthState() {
        _authState.value = null
    }
} 