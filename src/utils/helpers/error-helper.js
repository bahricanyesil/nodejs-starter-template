const logger = require('../logger');
const en = require('../lang/en');
const tr = require('../lang/tr');

module.exports = (code, req, errorMessage) => {
    //NOTE: This control routes every server error to the same lang key.
    let key = code;
    if (!en[code]) {
        key = '00008';
    }
    const enMessage = en[key];
    const trMessage = tr[key];
    if (enMessage.includes('server error')) {
        logger(code, req?.user?._id ?? '', errorMessage, 'Server Error', req);
    } else {
        logger(code, req?.user?._id ?? '', errorMessage ?? enMessage, 'Client Error', req);
    }

    return {
        'resultMessage': {
            'en': enMessage,
            'tr': trMessage
        },
        'resultCode': code
    };
};