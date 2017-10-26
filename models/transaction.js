// let mongoose = require('mongoose');
import mongoose from 'mongoose';

// define the schema for our user model
let transactionSchema = mongoose.Schema({
        acountNumber: Number,
        detail: String,
        sender: String,
        credit: Number,
        referenceNo: String,
        username: String,
        Debit: Number
},
        {
                timestamps: { createdAt: 'created_at' }
        });

// create the model for users and expose it to our app
module.exports = mongoose.model('Transaction', transactionSchema);
