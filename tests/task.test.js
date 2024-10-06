const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // assuming your express app is exported from server.js
const Task = require('../models/Task');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Global variables to store JWT tokens
let userToken;
let adminToken;

beforeAll(async () => {
  // Clear out database
  await User.deleteMany({});
  await Task.deleteMany({});

  // Create a user
  const user = new User({
    username: 'testUser',
    email: 'user@example.com',
    password: '123456',
    role: 'User',
  });
  await user.save();

  // Create an admin
  const admin = new User({
    username: 'adminUser',
    email: 'admin@example.com',
    password: '123456',
    role: 'Admin',
  });
  await admin.save();

  // Generate JWT tokens for authentication
  userToken = jwt.sign({ id: user._id, role: 'User' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  adminToken = jwt.sign({ id: admin._id, role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task Management API', () => {
  /**
   * User Task Operations
   */
  describe('User Operations', () => {
    it('should create a task as a user', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', userToken)
        .send({
          title: 'User Task 1',
          description: 'This is a user task',
          dueDate: '2024-12-01',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('title', 'User Task 1');
    });

    it('should fetch all tasks for the user', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', userToken);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should fetch overdue tasks for the user', async () => {
      const response = await request(app)
        .get('/api/tasks/overdue')
        .set('Authorization', userToken);

      expect(response.statusCode).toBe(200);
    });
  });

  /**
   * Admin Task Operations
   */
  describe('Admin Operations', () => {
    it('should fetch all tasks as an admin', async () => {
      const response = await request(app)
        .get('/api/admin/tasks')
        .set('Authorization', adminToken);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should delete a task as an admin', async () => {
      const task = await Task.findOne(); // Find any existing task

      const response = await request(app)
        .delete(`/api/admin/tasks/${task._id}`)
        .set('Authorization', adminToken);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Task deleted');
    });

    it('should return access denied when a non-admin user tries to delete a task', async () => {
      const task = await Task.findOne(); // Find any existing task

      const response = await request(app)
        .delete(`/api/admin/tasks/${task._id}`)
        .set('Authorization', userToken);

      expect(response.statusCode).toBe(403);
      expect(response.body).toHaveProperty('message', 'Access denied');
    });
  });
});
