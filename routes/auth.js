const express = require('express');
const authcontroller = require('../controllers/authcontroller');
const router = express.Router();

router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);
router.post('/forgot-password', authcontroller.sendOtp); // Request OTP
router.post('/reset-password', authcontroller.verifyOtpAndResetPassword); 
module.exports = router;
