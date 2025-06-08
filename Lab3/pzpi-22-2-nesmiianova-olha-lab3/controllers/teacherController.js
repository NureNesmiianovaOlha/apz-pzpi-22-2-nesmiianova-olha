const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Grade = require('../models/Grade');

// Get all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single teacher
const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create teacher
const createTeacher = async (req, res) => {
  const teacher = new Teacher({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update teacher
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    if (req.body.fullName) teacher.fullName = req.body.fullName;
    if (req.body.email) teacher.email = req.body.email;
    if (req.body.password) teacher.password = req.body.password;

    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    await teacher.deleteOne();
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get teacher's subjects
const getTeacherSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ teacherId: req.params.id })
      .select('title name description')
      .lean();

    // Map subjects to ensure consistent structure
    const mappedSubjects = subjects.map(subject => ({
      _id: subject._id,
      title: subject.title || subject.name, // Use title if available, otherwise use name
      description: subject.description
    }));

    res.json(mappedSubjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subject's students with their grades
const getSubjectStudents = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId)
      .populate('students', 'fullName')
      .lean();

    if (!subject) {
      return res.status(404).json({ message: 'Предмет не знайдено' });
    }

    if (!subject.students || subject.students.length === 0) {
      return res.json([]);
    }

    // Отримуємо оцінки для кожного студента
    const studentsWithGrades = await Promise.all(
      subject.students.map(async (student) => {
        const grades = await Grade.find({
          studentId: student._id,
          subjectId: req.params.subjectId
        })
        .select('gradeValue date')
        .sort({ date: -1 })
        .lean();

        return {
          _id: student._id,
          fullName: student.fullName,
          grades: grades.map(g => ({
            _id: g._id,
            gradeValue: g.gradeValue,
            date: g.date
          }))
        };
      })
    );

    res.json(studentsWithGrades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update grade
const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.gradeId);
    if (!grade) {
      return res.status(404).json({ message: 'Оцінку не знайдено' });
    }

    grade.gradeValue = req.body.grade;
    grade.date = new Date(); // Оновлюємо дату при зміні оцінки

    const updatedGrade = await grade.save();
    
    // Повертаємо оновлену оцінку з усіма необхідними полями
    const populatedGrade = await Grade.findById(updatedGrade._id)
      .select('gradeValue date')
      .lean();

    res.json({
      _id: populatedGrade._id,
      gradeValue: populatedGrade.gradeValue,
      date: populatedGrade.date
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new grade
const addGrade = async (req, res) => {
  try {
    const { studentId, subjectId, grade: gradeValue } = req.body;

    const newGrade = new Grade({
      studentId,
      subjectId,
      gradeValue,
      date: new Date()
    });

    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherSubjects,
  getSubjectStudents,
  updateGrade,
  addGrade
}; 