const bcrypt = require('bcryptjs');
const { User, Token } = require('../../../../models');
const { userValidator } = require('../../../validators');
const { errorHelper, getText, jwtTokenHelper, logger } = require('../../../../utils');

module.exports = async (req, res) => {
    const { error } = userValidator.login(req.body);
    if (error) {
        let code = '00038';
        if (error.details[0].message.includes('email'))
            code = '00039';
        else if (error.details[0].message.includes('password'))
            code = '00040';

        return res.status(400).json(errorHelper(code, req, error.details[0].message));
    }

    const user = await User.findOne({ email: req.body.email, isActivated: true, isVerified: true }).select('+password')
        .catch((err) => {
            return res.status(500).json(errorHelper('00041', req, err.message));
        });

    if (!user)
        return res.status(404).json(errorHelper('00042', req));

    if (!user.isActivated)
        return res.status(400).json(errorHelper('00043', req));

    if (!user.isVerified)
        return res.status(400).json(errorHelper('00044', req));

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
        return res.status(400).json(errorHelper('00045', req));

    const accessToken = jwtTokenHelper.signAccessToken(user._id);
    const refreshToken = jwtTokenHelper.signRefreshToken(user._id);
    //NOTE: 604800000 ms is equal to 7 days. So, the expiry date of the token is 7 days after.
    await Token.updateOne(
        { userId: user._id },
        {
            $set: {
                refreshToken: refreshToken,
                status: true,
                expiresIn: Date.now() + 604800000,
                createdAt: Date.now()
            },
        }
    ).catch((err) => {
        return res.status(500).json(errorHelper('00046', req, err.message));
    });

    logger('00047', user._id, getText('en', '00047'), 'Info', req);
    return res.status(200).json({
        resultMessage: { en: getText('en', '00047'), tr: getText('tr', '00047') },
        resultCode: '00047', user, accessToken, refreshToken
    });
};

/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: Login
 *      requestBody:
 *        description: New password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: The new password was created successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *        "400":
 *          description: Please provide all the required fields!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */