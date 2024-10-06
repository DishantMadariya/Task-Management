const express = require('express');
const admincontroller= require('../controllers/admincontroller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

// Admin routes
router.get('/', auth, role(['Admin']), admincontroller.getAllTasks); // Admin fetches all tasks
router.delete('/:id', auth, role(['Admin']), admincontroller.deleteTask); // Admin deletes a task

module.exports = router;
