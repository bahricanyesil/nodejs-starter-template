const logger = require('../logger');
const en = require('../lang/en');
const tr = require('../lang/tr');

module.exports = (code, req, errorMessage) => {
    //NOTE: This control routes every server error to the same lang key.
    let key = code;
    if (!en[code]) key = '00008';

    let userId = '';
    if (req && req.user && req.user._id) userId = req.user._id;

    const enMessage = en[key];
    const trMessage = tr[key];

    if (enMessage.includes('server error')) {
        logger(code, userId, errorMessage, 'Server Error', req);
    } else {
        logger(code, userId, errorMessage ?? enMessage, 'Client Error', req);
    }

    return {
        'resultMessage': {
            'en': enMessage,
            'tr': trMessage
        },
        'resultCode': code
    };
};