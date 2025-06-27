import React, { useEffect, useState } from 'react';
import { Typography, Container, Box } from '@mui/material';
import TransactionTable from '../components/TransactionTable';
import RevenueChart from '../components/RevenueChart';

const DashboardPage = () => {
  return (
    <Container>
      <Typography variant="h4" mt={4}>Dashboard</Typography>
      <RevenueChart />
      { <TransactionTable /> }
    </Container>
  );
};

export default DashboardPage;
