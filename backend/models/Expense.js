// backend/models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  splitType: { 
    type: String, 
    enum: ['equal', 'custom', 'percentage'], 
    default: 'equal' 
  },
  splits: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    percentage: { type: Number }
  }],
  category: { 
    type: String, 
    enum: ['rent', 'food', 'utilities', 'entertainment', 'other'],
    default: 'other'
  },
  date: { type: Date, default: Date.now },
  isSettled: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);