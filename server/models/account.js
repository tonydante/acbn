// let mongoose = require('mongoose');
import mongoose from 'mongoose';

// define the schema for our user model
let accountSchema = mongoose.Schema({
    accountNumber: {
        type: Number,
        min: [6, 'enter atleast six numbers'],
        required: true
    },
    accountType: String,
    balance: Number,
    userId: mongoose.Schema.Types.ObjectId },
    { timestamps: { createdAt: 'created_at' }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Account', accountSchema);
