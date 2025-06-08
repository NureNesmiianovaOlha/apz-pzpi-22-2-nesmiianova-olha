const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Student login
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for student email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: student.id,
      fullName: student.fullName,
      email: student.email,
      role: 'student',
      token: generateToken(student._id, 'student'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher login
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for teacher email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: teacher.id,
      fullName: teacher.fullName,
      email: teacher.email,
      role: 'teacher',
      token: generateToken(teacher._id, 'teacher'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
      role: 'admin',
      token: generateToken(admin._id, 'admin'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginStudent,
  loginTeacher,
  loginAdmin,
}; 