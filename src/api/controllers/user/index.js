// AUTH
const register = require('./auth/register');
const login = require('./auth/login');
const logout = require('./auth/logout');
const verifyEmail = require('./auth/verify-email');
const refreshToken = require('./auth/refresh-token');
const forgotPassword = require('./auth/forgot-password');
const sendVerificationCode = require('./auth/send-verification-code');

// EDIT
const changePassword = require('./edit/change-password');

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    refreshToken,
    sendVerificationCode,
    forgotPassword,
    changePassword
};
