import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Box, MenuItem
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');

      const params: any = {};
      if (amount) params.amount = amount;
      if (category) params.category = category;
      if (status) params.status = status;
      if (user) params.user_id = user;
      if (fromDate) params.from = fromDate.toISOString();
      if (toDate) params.to = toDate.toISOString();

      const res = await axios.get('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setTransactions(res.data);
    };

    fetchTransactions();
  }, [amount, category, status, user, fromDate, toDate]);

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          label="Amount >="
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <TextField
          label="Category"
          select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="revenue">Revenue</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </TextField>
        <TextField
          label="Status"
          select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </TextField>
        <TextField
          label="User ID"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={setFromDate}
            slotProps={{
              textField: {
                variant: 'outlined',
              },
            }}
          />
          <DatePicker
            label="To"
            value={toDate}
            onChange={setToDate}
            slotProps={{
              textField: {
                variant: 'outlined',
              },
            }}
          />
        </LocalizationProvider>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx._id}>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell>{tx.status}</TableCell>
                <TableCell>{tx.user_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionTable;
