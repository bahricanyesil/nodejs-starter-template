const generateRandomCode = require('./helpers/generate-random-code');
const errorHelper = require('./helpers/error-helper');
const ipHelper = require('./helpers/ip-helper');
const localTextHelper = require('./helpers/local-text-helper');
const jwtTokenHelper = require('./helpers/jwt-token-helper');

const getText = require('./lang/get-text');

const sendCodeToEmail = require('./send-code-to-email');
const logger = require('./logger');

module.exports = {
    generateRandomCode,
    errorHelper,
    ipHelper,
    jwtTokenHelper,
    localTextHelper,
    sendCodeToEmail,
    getText,
    logger
}