const userModel = require('./user');
const tokenModel = require('./token');
const logModel = require('./log');

module.exports = {
    User: userModel,
    Token: tokenModel,
    Log: logModel
};
