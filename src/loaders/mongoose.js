const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose
        .connect(process.env.DB_URI,
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