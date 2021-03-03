const bcrypt = require("bcryptjs");
const { User } = require("../../../../models");
const { userValidator } = require("../../../validators");
const { errorHelper, getText, logger } = require("../../../../utils");

module.exports = async (req, res) => {
    const { error } = userValidator.forgotPassword(req.body);
    if (error) return res.status(400).json(errorHelper('00066', req, error.details[0].message));

    const hash = await bcrypt.hash(req.body.password, 10);

    await User.updateOne({ _id: req.user._id, isVerified: true, isActivated: true }, { $set: { password: hash } })
        .catch(err => {
            return res.status(500).json(errorHelper('00067', req, err.message));
        });

    logger("00068", req.user._id, getText('en', '00068'), 'Info', req);
    return res.status(200).json({
        resultMessage: { en: getText('en', '00068'), tr: getText('tr', '00068') },
        resultCode: "00068"
    });
};
