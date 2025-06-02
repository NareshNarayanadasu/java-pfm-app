import React, { useState, useEffect } from 'react';
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } from './Expenceapi'; // Adjust the path accordingly
import { TextField, Button, Grid, Typography, Card, CardContent, Box, Alert } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    date: '',
    amount: '',
  });
  const [editExpense, setEditExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
const navigate = useNavigate();
  // Fetch all expenses on initial load
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const fetchedExpenses = await getAllExpenses();
      setExpenses(fetchedExpenses);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      await createExpense(newExpense);
      setNewExpense({ category: '', date: '', amount: '' }); // Reset form
      fetchExpenses(); // Refresh the list of expenses
    } catch (err) {
      setError('Failed to create expense');
    }
  };

  const handleEdit = async (id) => {
    try {
      const expense = await getExpenseById(id);
      setEditExpense(expense);
    } catch (err) {
      setError('Failed to fetch expense');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateExpense(editExpense.id, editExpense);
      setEditExpense(null);
      fetchExpenses(); // Refresh the list of expenses
    } catch (err) {
      setError('Failed to update expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses(); // Refresh the list of expenses
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  return (
    <Box p={3}>
      
      <Typography variant="h4" align="center" gutterBottom>
        Expense Manager
      </Typography>
      <Button variant="contained" color="default" onClick={() => navigate('/sidebar')} sx={{ mb: 2 }}>
              Back to Dashboard
            </Button>
      {error && <Alert severity="error">{error}</Alert>}

      {/* Create Expense Form */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Create Expense</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Category"
                name="category"
                fullWidth
                value={newExpense.category}
                onChange={handleChange}
                variant="outlined"
                placeholder="Enter category (e.g., Groceries)"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Date"
                name="date"
                type="date"
                fullWidth
                value={newExpense.date}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                fullWidth
                value={newExpense.amount}
                onChange={handleChange}
                variant="outlined"
                placeholder="Enter amount"
                step="0.01" // For decimals
              />
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Create Expense
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* All Expenses List */}
      <Typography variant="h6" gutterBottom>
        All Expenses
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      <Grid container spacing={2}>
        {expenses.map((expense) => (
          <Grid item xs={12} sm={6} md={4} key={expense.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{expense.category}</Typography>
                <Typography variant="body1">${expense.amount}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {expense.date}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(expense.id)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(expense.id)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Expense Form */}
      {editExpense && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Edit Expense</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Category"
                  name="category"
                  fullWidth
                  value={editExpense.category}
                  onChange={(e) =>
                    setEditExpense((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  variant="outlined"
                  placeholder="Enter category"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  fullWidth
                  value={editExpense.date}
                  onChange={(e) =>
                    setEditExpense((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  fullWidth
                  value={editExpense.amount}
                  onChange={(e) =>
                    setEditExpense((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  variant="outlined"
                  step="0.01"
                />
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Expense
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setEditExpense(null)} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ExpenseManager;
