const register = require('./auth/register');
const login = require('./auth/login');
const sendVerificationCode = require('./auth/send-verification-code');

module.exports = {
    register,
    login,
    sendVerificationCode
};
