const express = require('express');
const router = express.Router();
const { auth, imageUpload } = require('../middlewares');

const userController = require('../controllers/user/');

// AUTH
router.post('/', userController.register);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);
router.post('/verify-email', userController.verifyEmail);
router.post('/refresh-token', userController.refreshToken);
router.post('/forgot-password', auth, userController.forgotPassword);
router.post('/send-verification-code', userController.sendVerificationCode);
//TODO: Social logins will be added

// EDIT
router.post('/change-password', auth, userController.changePassword);
router.put('/', auth, imageUpload, userController.editUser);

router.get('/', auth, userController.getUser);
router.delete('/', auth, userController.deleteUser);

module.exports = router;