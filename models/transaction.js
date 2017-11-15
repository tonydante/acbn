// let mongoose = require('mongoose');
import mongoose from 'mongoose';

// define the schema for our user model
let transactionSchema = mongoose.Schema({
        accountNumber: Number,
        detail: String,
        sender: String,
        amount: String,
        referenceNo: String,
        username: String,
        transactionType: String,
        date: String 
},
        {
                timestamps: { createdAt: 'created_at' }
        });

// create the model for users and expose it to our app
module.exports = mongoose.model('Transaction', transactionSchema);
