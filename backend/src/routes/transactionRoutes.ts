import express from 'express';
import { getTransactions } from '../controllers/transactionController';
import { verifyToken } from '../middleware/auth';
const router = express.Router();

router.get('/', verifyToken, getTransactions);
export default router;