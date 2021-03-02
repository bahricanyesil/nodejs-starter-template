const mongoose = require('mongoose');
const { errorHelper } = require('../../utils');

module.exports = function (req, res, next) {
    if (!req.params.id)
        return res.status(400).json(errorHelper('00022', req));

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).json(errorHelper('00023', req));

    next();
}