import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import TransactionTable from '../components/TransactionTable';
import RevenueChart from '../components/RevenueChart';

const DashboardPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box mt={4}>
        <RevenueChart />
      </Box>
      <Box mt={4}>
        <TransactionTable />
      </Box>
    </Container>
  );
};

export default DashboardPage;
