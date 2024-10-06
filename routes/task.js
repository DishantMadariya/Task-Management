const express = require('express');
const taskcontroller = require('../controllers/taskcontroller');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/createtask', auth, taskcontroller.createTask); // User creates a task
router.get('/getTask', auth, taskcontroller.getUserTasks); // User fetches their tasks
router.get('/overdue', auth, taskcontroller.getOverdueTasks); // User fetches overdue tasks

module.exports = router;
