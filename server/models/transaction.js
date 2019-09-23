import mongoose from 'mongoose';

// define the schema for our user model
const transactionSchema = new mongoose.Schema({
        detail: String,
        amount: String,
        referenceNo: String,
        transactionType: String,
},
  {
        timestamps: { createdAt: 'created_at' }
  });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
