const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema); 