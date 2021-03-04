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
const editUser = require('./edit/edit-user');

const getUser = require('./get-user');
const deleteUser = require('./delete-user');

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    refreshToken,
    sendVerificationCode,
    forgotPassword,
    changePassword,
    editUser,
    getUser,
    deleteUser
};