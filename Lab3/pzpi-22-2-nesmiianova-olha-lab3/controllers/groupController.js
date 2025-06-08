const Group = require('../models/Group');

// Get all groups
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('students', 'fullName email');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single group
const getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('students', 'fullName email');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create group
const createGroup = async (req, res) => {
  const group = new Group({
    name: req.body.name,
    students: req.body.students || []
  });

  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update group
const updateGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (req.body.name) group.name = req.body.name;
    if (req.body.students) group.students = req.body.students;

    const updatedGroup = await group.save();
    await updatedGroup.populate('students', 'fullName email');
    res.json(updatedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete group
const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    await group.deleteOne();
    res.json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup
}; 