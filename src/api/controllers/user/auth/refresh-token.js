const JWT = require('jsonwebtoken');
const { Token } = require('../../../../models');
const { userValidator } = require('../../../validators');
const { errorHelper, getText, ipHelper, jwtTokenHelper } = require('../../../../utils');
const { refreshTokenSecretKey } = require('../../../../config');

module.exports = async (req, res) => {
    const { error } = userValidator.refreshToken(req.body);
    if (error) return res.status(400).json(errorHelper('00059', req, error.details[0].message));

    try {
        req.user = await JWT.verify(req.body.refreshToken, refreshTokenSecretKey)
    } catch (err) {
        return res.status(400).json(errorHelper('00063', req, err.message));
    }

    const userToken = await Token.findOne({ userId: req.user._id }).catch((err) => {
        return res.status(500).json(errorHelper('00060', req, err.message));
    });

    if (userToken.refreshToken !== req.body.refreshToken || !userToken)
        return res.status(404).json(errorHelper('00061', req));

    if (userToken.expiresIn <= Date.now() || !userToken.status)
        return res.status(400).json(errorHelper('00062', req));

    const accessToken = jwtTokenHelper.signAccessToken(req.user._id);
    const refreshToken = jwtTokenHelper.signRefreshToken(req.user._id);

    await Token.updateOne({ userId: req.user._id },
        {
            $set: {
                refreshToken: refreshToken,
                createdByIp: ipHelper(req),
                createdAt: Date.now(),
                expires: Date.now() + 604800000,
                status: true
            },
        }
    ).catch((err) => {
        return res.status(500).json(errorHelper('00064', req, err.message));
    });

    return res.status(200).json({
        resultMessage: { en: getText('en', '00065'), tr: getText('tr', '00065') },
        resultCode: '00065', accessToken, refreshToken
    });
};
