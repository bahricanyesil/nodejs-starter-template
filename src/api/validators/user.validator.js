const Joi = require('joi');

function validateRegister(body) {
    const schema = Joi.object({
        email: Joi.string().email().min(3).required(),
        password: Joi.string().min(6).max(20).required(),
        name: Joi.string().min(3).max(24).required(),
        language: Joi.string().valid('tr', 'en').required(),
        platform: Joi.string().valid('Android', 'IOS').required(),
        timezone: Joi.number().required(),
        deviceId: Joi.string().min(4).required()
    });
    return schema.validate(body);
}

function validateLogin(body) {
    const schema = Joi.object({
        email: Joi.string().email().min(3).required(),
        password: Joi.string().min(6).max(20).required()
    });
    return schema.validate(body);
}

function validateSendVerificationCode(body) {
    const schema = Joi.object({
        email: Joi.string().email().min(3).required()
    });
    return schema.validate(body);
}

function validateVerifyEmail(body) {
    const schema = Joi.object({
        token: Joi.string().min(10).required(),
        code: Joi.string().length(4).required()
    });
    return schema.validate(body);
}

function validateRefreshToken(body) {
    const schema = Joi.object({
        refreshToken: Joi.string().min(10).required()
    });
    return schema.validate(body);
}

function validateForgotPassword(body) {
    const schema = Joi.object({
        password: Joi.string().min(6).max(20).required()
    });
    return schema.validate(body);
}

module.exports = {
    register: validateRegister,
    login: validateLogin,
    sendVerificationCode: validateSendVerificationCode,
    verifyEmail: validateVerifyEmail,
    refreshToken: validateRefreshToken,
    forgotPassword: validateForgotPassword
};

