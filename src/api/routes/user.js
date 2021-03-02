const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares');

const userController = require('../controllers/user/');

router.post('/register', userController.register);
router.post("/login", userController.login);
router.post("/send-verification-code", userController.sendVerificationCode);

module.exports = router;