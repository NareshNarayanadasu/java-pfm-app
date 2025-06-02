import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InvestmentComponent = () => {
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    amountInvested: 0,
    currentValue: 0,
    dateOfInvestment: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await axios.get('http://localhost:8081/api/investment', config);
      setInvestments(response.data);
    } catch (error) {
      setError('Error fetching investments');
      console.error('Error fetching investments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestment({ ...newInvestment, [name]: value });
  };

  const handleAddInvestment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await axios.post('http://localhost:8081/api/investment/investment', newInvestment, config);
      setInvestments([...investments, response.data]);
      setNewInvestment({ name: '', amountInvested: 0, currentValue: 0, dateOfInvestment: '' });
    } catch (error) {
      setError('Error adding investment');
      console.error('Error adding investment:', error);
    }
  };

  const handleDeleteInvestment = async (id) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`http://localhost:8081/api/investment/${id}`, config);
      setInvestments(investments.filter((investment) => investment.id !== id));
    } catch (error) {
      setError('Error deleting investment');
      console.error('Error deleting investment:', error);
    }
  };

  return (
    <Box p={3}>
      
      <Typography variant="h4" gutterBottom>
        Investment Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/sidebar')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Form to add new investment */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add New Investment
              </Typography>
              <form onSubmit={handleAddInvestment}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Investment Name"
                  name="name"
                  value={newInvestment.name}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="number"
                  label="Amount Invested"
                  name="amountInvested"
                  value={newInvestment.amountInvested}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="number"
                  label="Current Value"
                  name="currentValue"
                  value={newInvestment.currentValue}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="date"
                  label="Date of Investment"
                  InputLabelProps={{ shrink: true }}
                  name="dateOfInvestment"
                  value={newInvestment.dateOfInvestment}
                  onChange={handleInputChange}
                  required
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Investment
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Investment List */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Investment List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount Invested</TableCell>
                <TableCell>Current Value</TableCell>
                <TableCell>Performance (%)</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell>{investment.name}</TableCell>
                  <TableCell>${investment.amountInvested}</TableCell>
                  <TableCell>${investment.currentValue}</TableCell>
                  <TableCell>
                    {investment.performance ? investment.performance.toFixed(2) : '0'}%
                  </TableCell>
                  <TableCell>{investment.dateOfInvestment}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteInvestment(investment.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvestmentComponent;
