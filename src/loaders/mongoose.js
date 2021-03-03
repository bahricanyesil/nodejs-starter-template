const mongoose = require('mongoose');
const { dbUri } = require('../config');

module.exports = async () => {
    await mongoose
        .connect(dbUri,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => {
            console.log('Mongodb Connection');
        })
        .catch(err => {
            console.log(err);
        });

    mongoose.Promise = global.Promise;
};