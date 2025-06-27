// src/models/Transaction.ts
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  user_id: { type: String, required: true },
  user_profile: { type: String }
});

export default mongoose.model('Transaction', TransactionSchema);

