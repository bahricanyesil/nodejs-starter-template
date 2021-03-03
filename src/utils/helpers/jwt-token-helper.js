const JWT = require('jsonwebtoken');
const { jwtSecretKey, refreshTokenSecretKey } = require('../../config');

module.exports = {
    signAccessToken: (userId) => {
        const accessToken = JWT.sign(
            { _id: userId },
            jwtSecretKey,
            {
                expiresIn: '1h',
            }
        );
        return accessToken;
    },

    signRefreshToken: (userId) => {
        const refreshToken = JWT.sign(
            { _id: userId },
            refreshTokenSecretKey,
            {
                expiresIn: '7d',
            }
        );
        return refreshToken;
    },

    signRConfirmCodeToken: (userId, confirmCode) => {
        const confirmCodeToken = JWT.sign(
            { _id: userId, code: confirmCode },
            jwtSecretKey,
            {
                expiresIn: '5m',
            }
        );
        return confirmCodeToken;
    },
}
