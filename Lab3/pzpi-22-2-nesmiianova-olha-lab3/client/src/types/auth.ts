export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
} 