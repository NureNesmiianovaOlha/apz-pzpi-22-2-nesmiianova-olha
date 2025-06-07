const Grade = require('../models/Grade');
const Student = require('../models/Student');

// Get all grades
const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate('studentId', 'fullName')
      .populate('subjectId', 'title');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single grade
const getGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate('studentId', 'fullName')
      .populate('subjectId', 'title');
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create grade
const createGrade = async (req, res) => {
  const grade = new Grade({
    studentId: req.body.studentId,
    subjectId: req.body.subjectId,
    gradeValue: req.body.gradeValue,
    date: req.body.date
  });

  try {
    const newGrade = await grade.save();
    
    // Add grade to student's grades array
    await Student.findByIdAndUpdate(
      req.body.studentId,
      { $push: { grades: newGrade._id } }
    );

    await newGrade.populate('studentId', 'fullName');
    await newGrade.populate('subjectId', 'title');
    
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update grade
const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    if (req.body.gradeValue) grade.gradeValue = req.body.gradeValue;
    if (req.body.date) grade.date = req.body.date;

    const updatedGrade = await grade.save();
    await updatedGrade.populate('studentId', 'fullName');
    await updatedGrade.populate('subjectId', 'title');
    
    res.json(updatedGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete grade
const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    // Remove grade from student's grades array
    await Student.findByIdAndUpdate(
      grade.studentId,
      { $pull: { grades: grade._id } }
    );

    await grade.deleteOne();
    res.json({ message: 'Grade deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGrades,
  getGrade,
  createGrade,
  updateGrade,
  deleteGrade
}; 