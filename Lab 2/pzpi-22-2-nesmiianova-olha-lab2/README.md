# Student Performance Monitoring System

A backend API for managing student performance, grades, and academic records.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/student-performance-db
JWT_SECRET=your_jwt_secret_here
```

3. Make sure MongoDB is running on your system

4. Start the server:
- For development with auto-reload:
```bash
npm run dev
```
- For production:
```bash
npm start
```

## Authentication

The system uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:
1. Login using your credentials to receive a JWT token
2. Add the token to the Authorization header as `Bearer <your_token>`
3. Use Swagger UI interface with the "Authorize" button for easy token management

## User Roles and Permissions

### Students
- Can view their own grades
- Can view their group information
- Can view subjects they are enrolled in

### Teachers
- Can manage grades for their subjects
- Can view and manage their subjects
- Can view student information
- Can view group information

### Administrators
- Full access to all system functions
- Can manage all users (students, teachers, admins)
- Can manage subjects, groups, and grades
- Can perform system configuration

## API Documentation

Swagger documentation is available at `/api-docs` when the server is running. It provides:
- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Interactive API testing interface

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login for all user types
- POST `/api/auth/register` - Register new user (protected, admin only)

### Students
- GET `/api/students` - Get all students
- GET `/api/students/:id` - Get a single student
- POST `/api/students` - Create a new student (admin only)
- PUT `/api/students/:id` - Update a student (admin only)
- DELETE `/api/students/:id` - Delete a student (admin only)

### Teachers
- GET `/api/teachers` - Get all teachers
- GET `/api/teachers/:id` - Get a single teacher
- POST `/api/teachers` - Create a new teacher (admin only)
- PUT `/api/teachers/:id` - Update a teacher (admin only)
- DELETE `/api/teachers/:id` - Delete a teacher (admin only)

### Subjects
- GET `/api/subjects` - Get all subjects
- GET `/api/subjects/:id` - Get a single subject
- POST `/api/subjects` - Create a new subject (admin only)
- PUT `/api/subjects/:id` - Update a subject (admin/teacher)
- DELETE `/api/subjects/:id` - Delete a subject (admin only)

### Grades
- GET `/api/grades` - Get all grades
- GET `/api/grades/:id` - Get a single grade
- POST `/api/grades` - Create a new grade (teacher/admin)
- PUT `/api/grades/:id` - Update a grade (teacher/admin)
- DELETE `/api/grades/:id` - Delete a grade (admin only)

### Groups
- GET `/api/groups` - Get all groups
- GET `/api/groups/:id` - Get a single group
- POST `/api/groups` - Create a new group (admin only)
- PUT `/api/groups/:id` - Update a group (admin only)
- DELETE `/api/groups/:id` - Delete a group (admin only)

### Administrators
- GET `/api/admins` - Get all admins (admin only)
- GET `/api/admins/:id` - Get a single admin (admin only)
- POST `/api/admins` - Create a new admin (admin only)
- PUT `/api/admins/:id` - Update an admin (admin only)
- DELETE `/api/admins/:id` - Delete an admin (admin only)

More endpoints for Teachers, Subjects, Grades, and Groups will be added soon. 