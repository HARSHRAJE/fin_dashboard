import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const RevenueChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
      const fetchData = async () => {

        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const grouped = res.data.reduce((acc: any, curr: any) => {
          const month = new Date(curr.date).toLocaleString('default', { month: 'short', year: 'numeric' });

          if (!acc[month]) acc[month] = { month, revenue: 0, expense: 0 };

          if (curr.status === 'Paid') {
            if (curr.category === 'Revenue') {
              acc[month].revenue += curr.amount;
            } else if (curr.category === 'Expense') {
              acc[month].expense += curr.amount;
            }
          }

          return acc;
        }, {});

        setData(Object.values(grouped));
    };


    fetchData();

  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#4caf50" />
        <Line type="monotone" dataKey="expense" stroke="#f44336" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;