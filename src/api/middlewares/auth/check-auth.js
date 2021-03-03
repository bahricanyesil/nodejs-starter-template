const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Token } = require('../../../models');
const { errorHelper } = require('../../../utils');
const { jwtSecretKey } = require('../../../config');

module.exports = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token)
        return res.status(401).json(errorHelper('00006', req));

    if (token.includes('Bearer'))
        token = req.header('Authorization').replace('Bearer ', '');

    try {
        req.user = JWT.verify(token, jwtSecretKey);
        if (!mongoose.Types.ObjectId.isValid(req.user._id))
            return res.status(400).json(errorHelper('00007', req));

        const exists = await User.exists({ _id: req.user._id, isVerified: true, isActivated: true })
            .catch((err) => {
                return res.status(500).json(errorHelper('00008', req, err.message));
            });

        if (!exists)
            return res.status(400).json(errorHelper('00009', req));

        const tokenExists = await Token.exists({ userId: req.user._id, status: true })
            .catch((err) => {
                return res.status(500).json(errorHelper('00010', req, err.message));
            });

        if (!tokenExists)
            return res.status(403).json(errorHelper('00011', req));

        next();
    } catch (err) {
        return res.status(403).json(errorHelper('00012', req, err.message));
    }
};
