const { Log } = require('../models');

module.exports = async (code, userId, errorMessage, level, ip) => {
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
