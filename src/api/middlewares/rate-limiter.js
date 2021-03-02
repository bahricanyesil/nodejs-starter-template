const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');
const { errorHelper } = require('../../utils');

const mongoOpts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const mongoConn = mongoose.createConnection(process.env.DB_URI, mongoOpts);

const opts = {
    storeClient: mongoConn,
    tableName: 'rateLimits',
    points: 100, // x requests
    duration: 60 // per y second by IP
};

module.exports = (req, res, next) => {
    const rateLimiterMongo = new RateLimiterMongo(opts);
    rateLimiterMongo.consume(req.ip)
        .then(() => {
            next();
        })
        .catch((err) => {
            return res.status(429).json(errorHelper('00024', req, err.message));
        });
}