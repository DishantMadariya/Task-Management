const Task = require('../models/Task');

// Admin: Get all tasks
module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort(req.query.sortBy);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete any task
module.exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
