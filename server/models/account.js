// let mongoose = require('mongoose');
import mongoose from 'mongoose';

// define the schema for our user model
let accountSchema = new mongoose.Schema({
    receiverBank: String,
    receiverName: String,
    receiverAccountNumber: String,
    swiftCode: String,
    email: String,
    ibanNumber: String,
    amountToTransfer: String,
    transferDescription: String,
    transactionType: String,
    userId: mongoose.Schema.Types.ObjectId
},
    {
        timestamps: { createdAt: 'created_at' }
    });

// create the model for users and expose it to our app
module.exports = mongoose.model('Account', accountSchema);
