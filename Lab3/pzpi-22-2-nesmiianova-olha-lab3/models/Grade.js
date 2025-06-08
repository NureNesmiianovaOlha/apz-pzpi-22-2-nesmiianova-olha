const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  gradeValue: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual fields for populated references
gradeSchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: '_id',
  justOne: true
});

gradeSchema.virtual('subject', {
  ref: 'Subject',
  localField: 'subjectId',
  foreignField: '_id',
  justOne: true
});

// Add pre-save middleware to update student's grades array
gradeSchema.pre('save', async function(next) {
  try {
    const Student = mongoose.model('Student');
    await Student.findByIdAndUpdate(
      this.studentId,
      { $addToSet: { grades: this._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-remove middleware to remove grade from student's grades array
gradeSchema.pre('remove', async function(next) {
  try {
    const Student = mongoose.model('Student');
    await Student.findByIdAndUpdate(
      this.studentId,
      { $pull: { grades: this._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Grade', gradeSchema); 