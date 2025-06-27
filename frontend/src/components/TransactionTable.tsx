import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/transactions?search=${search}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data);
    };
    fetchTransactions();
  }, [search]);

  return (
    <Paper sx={{ mt: 4 }}>
      <TextField label="Search" fullWidth sx={{ my: 2 }} value={search} onChange={e => setSearch(e.target.value)} />
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
