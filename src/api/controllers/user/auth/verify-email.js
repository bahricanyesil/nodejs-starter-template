const JWT = require("jsonwebtoken");
const { User, Token } = require("../../../../models");
const { userValidator } = require("../../../validators");
const { errorHelper, getText, logger, jwtTokenHelper } = require("../../../../utils");
const ipHelper = require('../../../../utils/helpers/ip-helper');
const { jwtSecretKey } = require('../../../../config');

module.exports = async (req, res) => {
    const { error } = userValidator.verifyEmail(req.body);
    if (error) return res.status(400).json(errorHelper('00053', req, error.details[0].message));

    try {
        req.user = JWT.verify(req.body.token, jwtSecretKey);
    } catch (err) {
        return res.status(400).json(errorHelper('00055', req, err.message));
    }

    const exists = await User.exists({ _id: req.user._id, isActivated: true })
        .catch((err) => {
            return res.status(500).json(errorHelper('00051', req, err.message));
        });

    if (!exists)
        return res.status(400).json(errorHelper('00052', req));

    if (req.body.code !== req.user.code)
        return res.status(400).json(errorHelper('00054', req));

    await User.updateOne({ _id: req.user._id }, { $set: { isVerified: true } })
        .catch((err) => {
            return res.status(500).json(errorHelper('00056', req, err.message));
        });

    const accessToken = jwtTokenHelper.signAccessToken(req.user._id);
    const refreshToken = jwtTokenHelper.signRefreshToken(req.user._id);
    await Token.updateOne(
        { userId: req.user._id },
        {
            $set: {
                userId: req.user._id,
                refreshToken: refreshToken,
                status: true,
                expires: Date.now() + 604800000,
                createdAt: Date.now(),
                createdByIp: ipHelper(req)
            },
        },
        {
            upsert: true
        }).catch(err => {
            return res.status(500).json(errorHelper('00057', req, err.message));
        });

    logger("00058", req.user._id, getText('en', '00058'), 'Info', req);
    return res.status(200).json({
        resultMessage: { en: getText('en', '00058'), tr: getText('tr', '00058') },
        resultCode: "00058", accessToken, refreshToken
    });
};