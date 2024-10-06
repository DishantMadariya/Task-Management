# Task Management API

This project is a **Task Management API** built using **Node.js**, **Express**, and **MongoDB**, following the **MVC (Model-View-Controller)** architecture. The API supports user authentication, role-based authorization (for users and admins), task management (CRUD operations), and security features such as JWT authentication and rate limiting.

## Features

- **User Authentication**: User registration and login with JWT tokens.
- **Role-Based Authorization**: Admin and regular user roles.
- **Task Management**: Create, read, update, and delete tasks.
  - Regular users can only manage their own tasks.
  - Admins can manage all tasks.
- **Task Due Dates**: Support for setting due dates, and automatic overdue task detection.
- **Advanced Querying**: Filter and sort tasks with parameters like `status` and `dueDate`.
- **Rate Limiting**: Protect login routes from brute-force attacks.
- **Password Reset**: Email-based password reset feature using **NodeMailer**.
- **Security**: Utilizes **Helmet.js** for security headers.
- **Comprehensive Testing**: API tested using **Jest** and **Supertest**.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Security Features](#security-features)
- [License](#license)

---

## Technologies Used

- **Node.js** with **Express**: Server-side framework.
- **MongoDB** with **Mongoose**: Database and object modeling.
- **JWT (JSON Web Tokens)**: Authentication mechanism.
- **NodeMailer**: Email notifications for password resets.
- **Jest** & **Supertest**: Testing framework and HTTP assertions.
- **Helmet.js**: Security headers for Express.
- **express-rate-limit**: Brute-force protection for login routes.

---

## Getting Started

To get a local copy of this project up and running, follow these steps:

### Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** running locally or an instance of **MongoDB Atlas**.
  
---

### Installation

1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:  
   Create a `.env` file in the root directory and set the following environment variables:

   ```bash
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT secret>
   NODEMAILER_EMAIL=<Your email for sending password reset emails>
   NODEMAILER_PASSWORD=<Your email password>
   ```

4. **Run the server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

---

## API Endpoints

### **Authentication**

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login and receive a JWT token.

### **User Tasks**

- **POST** `/api/tasks/createtask`: Create a new task (User only).
- **GET** `/api/tasks/getTask`: Get all tasks for the logged-in user.
- **GET** `/api/tasks/overdue`: Get overdue tasks for the logged-in user.

### **Admin Tasks**

- **GET** `/api/admin/tasks`: Get all tasks (Admin only).
- **DELETE** `/api/admin/tasks/:id`: Delete a task by ID (Admin only).

### **Password Reset**

- **POST** `/api/auth/forgot-password`: Send a password reset link via email.
- **POST** `/api/auth/reset-password`: Reset password with token sent via email.

---

## Testing

Run the tests using **Jest** and **Supertest**.

1. **Run the tests**:
   ```bash
   npm test
   ```

The tests cover:

- **User authentication** (register, login).
- **Task operations** (create, fetch, delete).
- **Role-based access control** (Admin vs. User permissions).

---

## Project Structure

```bash
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── authController.js   # Authentication logic (register, login)
│   ├── taskController.js   # User task logic (CRUD operations)
│   └── adminController.js  # Admin task logic (manage all tasks)
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   └── role.js             # Role-based access control middleware
├── models/
│   ├── Task.js             # Task model
│   └── User.js             # User model
├── routes/
│   ├── auth.js             # Auth routes (register, login, reset password)
│   ├── task.js        # User task routes (CRUD operations)
│   └── admin.js       # Admin task routes (manage all tasks)
├── services/
│   └── nodemailer.js     # Handles sending emails (e.g., password reset)
├── tests/
│   └── task.test.js        # API endpoint tests
├── .env                    # Environment variables
├── index.js               # Entry point for the app
└── package.json            # Project metadata and dependencies
```

---

## Environment Variables

- **`MONGO_URI`**: MongoDB connection string.
- **`JWT_SECRET`**: Secret key for signing JWT tokens.
- **`NODEMAILER_EMAIL`**: Email address for sending password reset emails.
- **`NODEMAILER_PASSWORD`**: Password for the email account used with NodeMailer.

---

## Security Features

- **JWT Authentication**: Secures API endpoints with JWT tokens.
- **Role-Based Access Control**: Admin users can perform additional tasks (delete any task, view all tasks).
- **Rate Limiting**: Protects the login endpoint from brute-force attacks by limiting the number of login attempts.
- **Helmet.js**: Provides additional security by setting HTTP headers appropriately.
- **Password Reset**: Allows users to reset their password via email, using **NodeMailer**.

---

## Conclusion

This API provides a secure and scalable solution for managing tasks with user authentication and role-based access control. With features like rate-limiting, JWT, and password reset, the API ensures safety while maintaining user-friendly task management capabilities.

Feel free to contribute or report issues!