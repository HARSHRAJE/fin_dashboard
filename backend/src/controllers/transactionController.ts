import Transaction from '../models/Transaction';
import { Request, Response } from 'express';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const {
      amount,
      category,
      status,
      user_id,
      from,
      to,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    const filter: any = {};

    if (amount) {
      filter.amount = { $gte: parseFloat(amount as string) };
    }
    if (category) {
      filter.category = new RegExp(category.toString(), 'i');
    }
    if (status) {
      filter.status = new RegExp(status.toString(), 'i');
    }
    if (user_id) {
      filter.user_id = new RegExp(user_id.toString(), 'i');
    }

    if (from || to) {
      filter.date = {};
      if (from) {
        filter.date.$gte = new Date(from as string);
      }
      if (to) {
        const toDate = new Date(to as string);
        toDate.setHours(23, 59, 59, 999);
        filter.date.$lte = toDate;
      }
    }

    console.log("filter =>", filter); // debug line

    const transactions = await Transaction.find(filter).sort({
      [sortBy.toString()]: sortOrder === 'desc' ? -1 : 1,
    });

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
