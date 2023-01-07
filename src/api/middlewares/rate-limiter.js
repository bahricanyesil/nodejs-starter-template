import mongoose from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import { dbUri } from '../../config/index.js';
import { errorHelper } from '../../utils/index.js';


mongoose.set("strictQuery", false);
const mongoConn = mongoose.createConnection(dbUri, {});

const opts = {
  storeClient: mongoConn,
  tableName: 'rateLimits',
  points: 100, // x requests
  duration: 60 // per y second by IP
};

export default (req, res, next) => {
  const rateLimiterMongo = new RateLimiterMongo(opts);
  rateLimiterMongo.consume(req.ip)
    .then(() => {
      next();
    })
    .catch((err) => {
      return res.status(429).json(errorHelper('00024', req, err.message));
    });
}