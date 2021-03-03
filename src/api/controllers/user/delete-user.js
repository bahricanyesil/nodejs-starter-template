const bcrypt = require('bcryptjs');
const { User, Token } = require('../../../models');
const { generateRandomCode, errorHelper, getText, logger } = require('../../../utils');

module.exports = async (req, res) => {
    const anon = 'anon' + generateRandomCode(8);
    const hash = await bcrypt.hash(anon, 10);
    await User.updateOne({ _id: req.user._id }, {
        $set: {
            name: anon, username: anon, email: anon + '@anon.com', password: hash,
            photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
            isActivated: false, deletedAt: Date.now()
        }
    }).catch(err => {
        return res.status(500).json(errorHelper('00090', req, err.message));
    });

    await Token.deleteOne({ userId: req.user._id }).catch(err => {
        return res.status(500).json(errorHelper('00091', req, err.message));
    });

    logger('00092', req.user._id, getText('en', '00092'), 'Info', req);
    return res.status(200).json({
        resultMessage: { en: getText('en', '00092'), tr: getText('tr', '00092') },
        resultCode: '00092'
    });
};
