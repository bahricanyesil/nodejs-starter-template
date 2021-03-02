const JWT = require('jsonwebtoken');

module.exports = {
    signAccessToken: (userId) => {
        const authorization = JWT.sign(
            { _id: userId },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1h',
            }
        );
        return authorization;
    },

    signRefreshToken: (userId) => {
        const refreshToken = JWT.sign(
            { _id: userId },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            {
                expiresIn: '7d',
            }
        );
        return refreshToken;
    },
}
