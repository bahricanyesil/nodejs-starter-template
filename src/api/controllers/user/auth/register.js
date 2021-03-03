const bcrypt = require("bcryptjs");
const geoip = require("geoip-lite");
const { User } = require('../../../../models');
const { userValidator } = require('../../../validators');
const { errorHelper, generateRandomCode, sendCodeToEmail, logger, getText, localTextHelper, jwtTokenHelper } = require('../../../../utils');
const ipHelper = require('../../../../utils/helpers/ip-helper');

module.exports = async (req, res) => {
    const { error } = userValidator.register(req.body);
    if (error) {
        let code = '00025';
        if (error.details[0].message.includes("email"))
            code = '00026';
        else if (error.details[0].message.includes("password"))
            code = '00027';
        else if (error.details[0].message.includes("name"))
            code = '00028';

        return res.status(400).json(errorHelper(code, req, error.details[0].message));
    }

    const exists = await User.exists({ email: req.body.email })
        .catch((err) => {
            return res.status(500).json(errorHelper('00031', req, err.message));
        });

    if (exists)
        return res.status(409).json(errorHelper('00032', req));

    const hash = await bcrypt.hash(req.body.password, 10);

    const emailCode = generateRandomCode(4);
    await sendCodeToEmail(req.body.email, req.body.name, emailCode, req.body.language, 'register', req, res);

    let username = '';
    let tempName = '';
    let existsUsername = true;
    let name = localTextHelper.turkishToEnglish(req.body.name);
    if (name.includes(" ")) {
        tempName = name.trim().split(' ').slice(0, 1).join('').toLowerCase();
    } else {
        tempName = name.toLowerCase().trim();
    }
    do {
        username = tempName + generateRandomCode(4);
        existsUsername = await User.exists({ username: username })
            .catch((err) => {
                return res.status(500).json(errorHelper('00033', req, err.message));
            });
    } while (existsUsername);

    const geo = geoip.lookup(ipHelper(req));

    let user = new User({
        email: req.body.email,
        password: hash,
        name: name,
        username: username,
        language: req.body.language,
        platform: req.body.platform,
        isVerified: false,
        countryCode: geo == null ? 'US' : geo.country,
        timezone: req.body.timezone,
        lastLogin: Date.now()
    });

    user = await user.save().catch((err) => {
        return res.status(500).json(errorHelper('00034', req, err.message));
    });

    user.password = null;

    const confirmCodeToken = jwtTokenHelper.signRConfirmCodeToken(user._id, emailCode);
    console.log(emailCode);

    logger("00035", user._id, getText('en', '00035'), 'Info', req);
    return res.status(200).json({
        resultMessage: { en: getText('en', '00035'), tr: getText('tr', '00035') },
        resultCode: "00035", user, confirmToken: confirmCodeToken
    });
};
