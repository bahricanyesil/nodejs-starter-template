const { Log } = require('../models');
const ipHelper = require('./helpers/ip-helper');

module.exports = async (code, userId, errorMessage, level, req) => {
    let ip = 'no-ip';
    if(req !== '') ip = ipHelper(req);
    let log = new Log({
        resultCode: code,
        level: level,
        errorMessage: errorMessage,
        ip: ip
    });

    if (userId !== '' && userId) log.userId = userId;

    await log.save()
        .catch(err => {
            console.log('Logging is failed: ' + err);
        });
}
