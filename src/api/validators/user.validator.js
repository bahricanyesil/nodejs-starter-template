const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

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


module.exports = {
    register: validateRegister,
    login: validateLogin,
    sendVerificationCode: validateSendVerificationCode
};

