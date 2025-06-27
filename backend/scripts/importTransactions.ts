// scripts/importTransactions.ts
import mongoose from 'mongoose';
import * as fs from 'fs';
import Transaction from '../src/models/Transaction';

mongoose.connect('mongodb://localhost:27017/dashboard');

const data = JSON.parse(fs.readFileSync('./transactions.json', 'utf-8'));
Transaction.insertMany(data).then(() => {
  console.log('Inserted successfully');
  mongoose.disconnect();
});
