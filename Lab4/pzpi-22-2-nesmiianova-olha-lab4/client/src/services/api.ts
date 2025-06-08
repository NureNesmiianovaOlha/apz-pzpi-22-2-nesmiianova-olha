import axios from 'axios';
import { AuthResponse, LoginCredentials, UserRole } from '../types/auth';

export interface Grade {
  _id: string;
  studentId: string;
  subjectId: string;
  gradeValue: number;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subject {
  _id: string;
  title?: string;
  name?: string;
  description?: string;
  teacherId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const loginTeacher = async (email: string, password: string) => {
  const { data } = await api.post('/auth/teacher/login', { email, password });
  return data;
};

export const loginStudent = async (email: string, password: string) => {
  const { data } = await api.post('/auth/student/login', { email, password });
  return data;
};

export const loginAdmin = async (email: string, password: string) => {
  const { data } = await api.post('/auth/admin/login', { email, password });
  return data;
};

// Teacher endpoints
export const getTeacherSubjects = async (teacherId: string) => {
  const { data } = await api.get(`/teachers/${teacherId}/subjects`);
  return data;
};

export const getTeacherStudents = async (subjectId: string) => {
  const { data } = await api.get(`/teachers/subjects/${subjectId}/students`);
  return data;
};

export const updateStudentGrade = async (gradeId: string, gradeValue: number) => {
  const { data } = await api.put(`/teachers/grades/${gradeId}`, { grade: gradeValue });
  return data;
};

export const addStudentGrade = async (studentId: string, subjectId: string, gradeValue: number) => {
  const { data } = await api.post('/teachers/grades', { 
    studentId, 
    subjectId, 
    grade: gradeValue 
  });
  return data;
};

// Student endpoints
export const getStudentGrades = async (studentId: string) => {
  const { data } = await api.get(`/students/${studentId}/grades`);
  return data;
};

export const getStudentSubjects = async (studentId: string) => {
  const { data } = await api.get(`/students/${studentId}/subjects`);
  return data;
};

export const getStudents = async () => {
  const { data } = await api.get('/students');
  return data;
};

// Admin endpoints
export const getUsers = async () => {
  const { data } = await api.get('/admin/users');
  return data;
};

export const createUser = async (userData: any) => {
  const { data } = await api.post('/admin/users', userData);
  return data;
};

export const updateUser = async (userId: string, userData: any) => {
  const { data } = await api.put(`/admin/users/${userId}`, userData);
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await api.delete(`/admin/users/${userId}`);
  return data;
};

// Grade endpoints
export const getGrades = async () => {
  const { data } = await api.get('/grades');
  return data;
};

export const getSubjects = async () => {
  const { data } = await api.get('/subjects');
  return data;
};

// IoT API functions
export const iotApi = {
  // Отримати всі IoT пристрої
  getDevices: async () => {
    const response = await fetch('/api/iot', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch IoT devices');
    }
    
    return response.json();
  },

  // Створити новий пристрій
  createDevice: async (deviceData: any) => {
    const response = await fetch('/api/iot', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deviceData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create IoT device');
    }
    
    return response.json();
  },

  // Оновити конфігурацію пристрою
  updateDeviceConfig: async (deviceId: string, config: any) => {
    const response = await fetch(`/api/iot/${deviceId}/config`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update device config');
    }
    
    return response.json();
  },

  // Видалити пристрій
  deleteDevice: async (deviceId: string) => {
    const response = await fetch(`/api/iot/${deviceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete device');
    }
    
    return response.json();
  },

  // Отримати дані сенсорів для пристрою
  getDeviceData: async (deviceId: string, params?: any) => {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`/api/iot/${deviceId}/data?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch device data');
    }
    
    return response.json();
  },

  // Отримати статистику активності студентів
  getStudentActivity: async (params?: any) => {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`/api/iot/activity?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch student activity');
    }
    
    return response.json();
  }
};

export default api; 