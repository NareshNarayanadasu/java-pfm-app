import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';

const WalletBalance = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token as a Bearer token
      },
    };
    axios.get('http://localhost:8081/api/wallet/balance', config)
      .then((response) => {
        console.log("API Response:", response); // Logs the actual balance value (e.g., 5255)
        setBalance(response.data); // Directly set the response data
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
        setError('Failed to fetch balance');
      });
  }, []); // Empty dependency array ensures the request is made once on component mount
 
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );  // Show error message if there is any error
  }
 
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: 300, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Current Wallet Balance
          </Typography>
          <Typography variant="h6">
            {balance !== null ? `$${balance}` : <CircularProgress />}
          </Typography>
          {/* Display the balance or loading spinner */}
        </CardContent>
      </Card>
    </Box>
  );
};
 
export default WalletBalance;
