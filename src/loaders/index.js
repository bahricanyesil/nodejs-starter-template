const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');

module.exports = async (app) => {
    await mongooseLoader();
    await expressLoader(app);
}