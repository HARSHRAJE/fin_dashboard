import Transaction from '../models/Transaction';
import { Request, Response } from 'express';

export const getTransactions = async (req: Request, res: Response) => {
  const { category, status, user_id, search, sortBy = 'date', sortOrder = 'desc' } = req.query;
  const filter: any = {};

  if (category) filter.category = category;
  if (status) filter.status = status;
  if (user_id) filter.user_id = user_id;
  if (search) {
    filter.$or = [
      { category: new RegExp(search.toString(), 'i') },
      { status: new RegExp(search.toString(), 'i') },
      { user_id: new RegExp(search.toString(), 'i') }
    ];
  }

  const transactions = await Transaction.find(filter).sort({ [sortBy.toString()]: sortOrder === 'desc' ? -1 : 1 });
  res.json(transactions);
};
