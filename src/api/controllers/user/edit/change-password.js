const bcrypt = require('bcryptjs');
const { User } = require('../../../../models');
const { userValidator } = require('../../../validators');
const { errorHelper, logger, getText } = require('../../../../utils');

module.exports = async (req, res) => {
    const { error } = userValidator.changePassword(req.body);
    if (error) return res.status(400).json(errorHelper('00069', req, error.details[0].message));

    if (req.body.oldPassword === req.body.newPassword) return res.status(400).json(errorHelper('00073', req));

    const user = await User.findById(req.user._id).select('password')
        .catch((err) => {
            return res.status(500).json(errorHelper('00070', req, err.message));
        });

    const match = await bcrypt.compare(req.body.oldPassword, user.password)
        .catch((err) => {
            return res.status(500).json(errorHelper('00071', req, err.message));
        });

    if (!match) return res.status(400).json(errorHelper('00072', req));

    const hash = await bcrypt.hash(req.body.newPassword, 10)
        .catch((err) => {
            return res.status(500).json(errorHelper('00074', req, err.message));
        });

    user.password = hash;

    await user.save().catch((err) => {
        return res.status(500).json(errorHelper('00075', req, err.message));
    });

    logger('00076', req.user._id, getText('en', '00076'), 'Info', req);
    return res.status(200).json({
        resultMessage: { en: getText('en', '00076'), tr: getText('tr', '00076') },
        resultCode: '00076'
    });
};
