const Student = require('../models/Student');
const Grade = require('../models/Grade');
const Subject = require('../models/Subject');

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('group', 'name')
      .populate('subjects', 'title name description');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single student
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('group', 'name')
      .populate('subjects', 'title name description')
      .populate({
        path: 'grades',
        populate: {
          path: 'subjectId',
          select: 'title name description'
        }
      });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create student
const createStudent = async (req, res) => {
  const student = new Student({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    group: req.body.groupId,
    subjects: req.body.subjects || []
  });

  try {
    const newStudent = await student.save();
    
    // Add student to subjects
    if (req.body.subjects && req.body.subjects.length > 0) {
      await Subject.updateMany(
        { _id: { $in: req.body.subjects } },
        { $addToSet: { students: newStudent._id } }
      );
    }
    
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const oldSubjects = student.subjects || [];
    
    if (req.body.fullName) student.fullName = req.body.fullName;
    if (req.body.email) student.email = req.body.email;
    if (req.body.password) student.password = req.body.password;
    if (req.body.groupId) student.group = req.body.groupId;
    if (req.body.subjects) student.subjects = req.body.subjects;

    const updatedStudent = await student.save();

    // Update subject-student relationships
    if (req.body.subjects) {
      const newSubjects = req.body.subjects;
      
      // Remove student from old subjects that are not in new subjects
      await Subject.updateMany(
        { _id: { $in: oldSubjects.filter(id => !newSubjects.includes(id)) } },
        { $pull: { students: student._id } }
      );
      
      // Add student to new subjects
      await Subject.updateMany(
        { _id: { $in: newSubjects.filter(id => !oldSubjects.includes(id)) } },
        { $addToSet: { students: student._id } }
      );
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Remove student from all subjects
    await Subject.updateMany(
      { students: student._id },
      { $pull: { students: student._id } }
    );

    // Delete student's grades
    await Grade.deleteMany({ studentId: student._id });

    await student.deleteOne();
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student subjects
const getStudentSubjects = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate({
        path: 'subjects',
        select: 'title name description credits semester',
        populate: {
          path: 'teacherId',
          select: 'fullName'
        }
      });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student.subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student grades
const getStudentGrades = async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.params.id })
      .populate('subjectId', 'title name description')
      .sort({ date: -1 });
    
    if (!grades) {
      return res.status(404).json({ message: 'Grades not found' });
    }

    // Map the grades to ensure consistent field names
    const formattedGrades = grades.map(grade => ({
      _id: grade._id,
      studentId: grade.studentId,
      subjectId: grade.subjectId,
      gradeValue: grade.gradeValue,
      date: grade.date,
      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt
    }));
    
    res.json(formattedGrades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentSubjects,
  getStudentGrades
}; 