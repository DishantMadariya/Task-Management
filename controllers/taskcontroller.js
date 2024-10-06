const Task = require('../models/Task');

// Create task
module.exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user tasks
module.exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get overdue tasks
module.exports.getOverdueTasks = async (req, res) => {
  try {
    const overdueTasks = await Task.find({ owner: req.user.id, dueDate: { $lt: new Date() } });
    res.json(overdueTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
