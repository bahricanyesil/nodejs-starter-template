const auth = require('./auth/check-auth');
const authority = require('./auth/check-authority');

const imageUpload = require('./image-upload');
const objectIdControl = require('./object-id-control');
const rateLimiter = require('./rate-limiter');

module.exports = {
    auth,
    authority,
    imageUpload,
    objectIdControl,
    rateLimiter
}