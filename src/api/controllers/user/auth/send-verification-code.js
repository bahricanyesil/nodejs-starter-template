const { User } = require('../../../../models');
const { userValidator } = require('../../../validators');
const { generateRandomCode, sendCodeToEmail, errorHelper, logger, getText, jwtTokenHelper } = require('../../../../utils');

module.exports = async (req, res) => {
    const { error } = userValidator.sendVerificationCode(req.body);
    if (error) return res.status(400).json(errorHelper('00029', req, error.details[0].message));

    const user = await User.findOne({ email: req.body.email, isActivated: true })
        .catch((err) => {
            return res.status(500).json(errorHelper('00030', req, err.message));
        });

    if (!user)
        return res.status(404).json(errorHelper('00036', req));

    const emailCode = generateRandomCode(4);
    await sendCodeToEmail(req.body.email, user.name, emailCode, user.language, 'newCode', req, res);

    user.isVerified = false;

    await user.save().catch((err) => {
        return res.status(500).json(errorHelper('00037', req, err.message));
    });

    const confirmCodeToken = jwtTokenHelper.signRConfirmCodeToken(user._id, emailCode);
    
    logger('00048', user._id, getText('en', '00048'), 'Info', req);
    return res.status(200).json({
        resultMessage: { en: getText('en', '00048'), tr: getText('tr', '00048') },
        resultCode: '00048',
        userId: user._id,
        confirmToken: confirmCodeToken
    });
};
