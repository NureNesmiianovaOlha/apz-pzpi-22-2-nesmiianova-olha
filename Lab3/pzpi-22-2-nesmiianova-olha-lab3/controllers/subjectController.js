const Subject = require('../models/Subject');

// Get all subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate('teacherId', 'fullName email')
      .populate('students', 'fullName');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single subject
const getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('teacherId', 'fullName email')
      .populate('students', 'fullName');
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create subject
const createSubject = async (req, res) => {
  const subject = new Subject({
    title: req.body.title,
    name: req.body.name,
    description: req.body.description,
    teacherId: req.body.teacherId,
    students: req.body.students || [],
    credits: req.body.credits,
    semester: req.body.semester
  });

  try {
    const newSubject = await subject.save();
    await newSubject.populate('teacherId', 'fullName email');
    await newSubject.populate('students', 'fullName');
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update subject
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    if (req.body.title) subject.title = req.body.title;
    if (req.body.name) subject.name = req.body.name;
    if (req.body.description) subject.description = req.body.description;
    if (req.body.teacherId) subject.teacherId = req.body.teacherId;
    if (req.body.students) subject.students = req.body.students;
    if (req.body.credits) subject.credits = req.body.credits;
    if (req.body.semester) subject.semester = req.body.semester;

    const updatedSubject = await subject.save();
    await updatedSubject.populate('teacherId', 'fullName email');
    await updatedSubject.populate('students', 'fullName');
    res.json(updatedSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete subject
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    await subject.deleteOne();
    res.json({ message: 'Subject deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject
}; 