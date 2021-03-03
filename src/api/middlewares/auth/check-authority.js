const { User } = require('../../../models');
const { errorHelper } = require('../../../utils');

module.exports = {
    checkAdmin: async function (req, res, next) {
        const user = await User.findById(req.user._id).select('type')
            .catch(err => {
                return res.status(500).json(errorHelper('00016', req, err.message));
            });

        if (user.type !== 'admin')
            return res.status(403).json(errorHelper('00017', req));

        next();
    },

    checkCreator: async function (req, res, next) {
        const user = await User.findById(req.user._id).select('type')
            .catch(err => {
                return res.status(500).json(errorHelper('00018', req, err.message));
            });

        if (user.type !== 'creator' && user.type !== 'admin')
            return res.status(403).json(errorHelper('00019', req));

        next();
    },

    checkReader: async function (req, res, next) {
        const user = await User.findById(req.user._id).select('type')
            .catch(err => {
                return res.status(500).json(errorHelper('00020', req, err.message));
            });

        if (user.type === 'user')
            return res.status(403).json(errorHelper('00021', req));

        next();
    },
}
