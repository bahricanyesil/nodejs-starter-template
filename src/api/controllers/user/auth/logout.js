const { Token } = require('../../../../models');
const { errorHelper, getText, logger } = require('../../../../utils');

module.exports = async (req, res) => {
    await Token.updateOne({ userId: req.user._id },
        {
            $set: { status: false, expiresIn: Date.now() }
        })
        .catch(err => { errorHelper('00049', req, err.message) });

    logger('00050', req.user._id, getText('en', '00050'), 'Info', req);
    return res.status(200).json({
        resultMessage: { en: getText('en', '00050'), tr: getText('tr', '00050') },
        resultCode: '00050'
    });
};
