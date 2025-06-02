import React, { useState, useEffect } from 'react';
import { createBudget, spendFromBudget, getAllBudgets } from './BudgetService';
import { TextField, Button, Grid, Typography, Box, Paper, Alert } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
function Budget() {
  const [budgetData, setBudgetData] = useState({
    category: '',
    amount: '',
    startdate: '',
    alertThreshold: 0.9,
  });

  const [spendData, setSpendData] = useState({
    category: '',
    actualAmountSpent: '',
  });

  const [budgets, setBudgets] = useState([]);
  const [message, setMessage] = useState('');
  const [showBudgets, setShowBudgets] = useState(false); // State for toggling budgets visibility
const navigate=useNavigate();
  const handleChangeBudget = (e) => {
    const { name, value } = e.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const handleChangeSpend = (e) => {
    const { name, value } = e.target;
    setSpendData({ ...spendData, [name]: value });
  };

  // Create a new budget
  const handleCreateBudget = async (e) => {
    e.preventDefault();
    try {
      const threshold = parseFloat(budgetData.alertThreshold);
      if (threshold < 0 || threshold > 1) {
        setMessage('Alert Threshold must be between 0 and 1.');
        return;
      }

      const response = await createBudget({
        ...budgetData,
        amount: parseFloat(budgetData.amount),
        alertThreshold: threshold,
      });
      setMessage(response);
      setBudgetData({
        category: '',
        amount: '',
        startdate: '',
        endDate: '',
        alertThreshold: 0.9,
      });
    } catch (error) {
      setMessage('Error creating budget.');
    }
  };

  // Spend from an existing budget
  const handleSpendFromBudget = async (e) => {
    e.preventDefault();
    try {
      const response = await spendFromBudget(spendData);
      setMessage(response);
      setSpendData({ category: '', actualAmountSpent: '' });
    } catch (error) {
      setMessage('Error spending from budget.');
    }
  };

  // Fetch all budgets
  const fetchAllBudgets = async () => {
    try {
      const budgetsList = await getAllBudgets();
      setBudgets(budgetsList);
    } catch (error) {
      setMessage('Error fetching budgets.');
    }
  };

  // Toggle visibility of the budgets list
  const toggleBudgets = () => {
    setShowBudgets(!showBudgets);
    if (!showBudgets) fetchAllBudgets(); // Fetch budgets if the section is being shown
  };

  return (
    <Box p={3} sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      
      <Typography variant="h4" align="center" gutterBottom>
        Budget Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/sidebar')} sx={{ mb: 2 }}>
              Back to Dashboard
            </Button>
      {/* Horizontal Layout for Forms and Budget List */}
      <Grid container spacing={3}>
        {/* Create Budget Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              Create Budget
            </Typography>
            <form onSubmit={handleCreateBudget}>
              <TextField
                label="Category"
                name="category"
                value={budgetData.category}
                onChange={handleChangeBudget}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={budgetData.amount}
                onChange={handleChangeBudget}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Start Date"
                name="startdate"
                type="date"
                value={budgetData.startdate}
                onChange={handleChangeBudget}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={budgetData.endDate}
                onChange={handleChangeBudget}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <TextField
                label="Alert Threshold (0.0 to 1.0)"
                name="alertThreshold"
                type="number"
                value={budgetData.alertThreshold}
                onChange={handleChangeBudget}
                fullWidth
                margin="normal"
                step="0.01"
                min="0.0"
                max="1.0"
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Budget
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Spend from Budget Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              Spend from Budget
            </Typography>
            <form onSubmit={handleSpendFromBudget}>
              <TextField
                label="Category"
                name="category"
                value={spendData.category}
                onChange={handleChangeSpend}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Amount Spent"
                name="actualAmountSpent"
                type="number"
                value={spendData.actualAmountSpent}
                onChange={handleChangeSpend}
                fullWidth
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Spend from Budget
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
     
      {/* Display Message */}
      {message && <Alert severity={message.includes('Error') ? 'error' : 'success'}>{message}</Alert>}

      {/* Toggle button for showing budgets */}
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleBudgets}
        sx={{ mt: 3, mb: 3 }}
      >
        {showBudgets ? 'Hide Budgets' : 'Show All Budgets'}
      </Button>

      {/* Show list of all budgets */}
      {showBudgets && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            All Budgets
          </Typography>
          {budgets.length > 0 ? (
            <ul>
              {budgets.map((budget) => (
                <li key={budget.id}>
                  <Typography variant="body1">
                    Category: {budget.category}
                    <br />
                    Amount: ${budget.amount}
                    <br />
                    Spent: ${budget.actualAmountSpent || 0}
                    <br />
                    {budget.amount < budget.actualAmountSpent ? (
                      <span style={{ color: 'red' }}>Over budget!</span>
                    ) : (
                      <span>Within budget</span>
                    )}
                    <br />
                    {budget.actualAmountSpent / budget.amount >= budget.alertThreshold ? (
                      <span style={{ color: 'red' }}>Alert: Threshold exceeded!</span>
                    ) : (
                      <span>Threshold not exceeded</span>
                    )}
                  </Typography>
                  
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No budgets available</Typography>
            
          )}
        </Box>

      )}
    </Box>
  );
}

export default Budget;
