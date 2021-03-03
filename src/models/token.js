const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Date, required: true },
    createdByIp: { type: String, required: true },
    status: { type: Boolean, default: true }
},
    {
        timestamps: true
    });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;