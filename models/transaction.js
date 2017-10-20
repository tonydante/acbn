// let mongoose = require('mongoose');
import mongoose from 'mongoose';

// define the schema for our user model
let transactionSchema = mongoose.Schema({
        accountType: String,
        details : String,
        deposite: String,
        withdrawal: String,
        balance: String,
        userId : mongoose.Schema.Types.ObjectId},
        { timestamps: { createdAt: 'created_at' }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Transaction', transactionSchema);
