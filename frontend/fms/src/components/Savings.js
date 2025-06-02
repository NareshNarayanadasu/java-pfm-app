import React, { useState, useEffect } from 'react';
import { createSavings, getAllSavings } from './SavingsService'; // Assuming SavingsService exists
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  LinearProgress,
  Grid,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Savings = () => {
  const [savingsData, setSavingsData] = useState({
    category: '',
    amountSaved: '',
    goalAmount: '',
    setGoalName: '',
  });

  const [savingsGoals, setSavingsGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSavings, setShowSavings] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSavingsData({ ...savingsData, [name]: value });
  };

  const handleCreateSavings = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createSavings(savingsData);
      setMessage('Savings goal created successfully!');
      setSavingsData({ category: '', amountSaved: '', goalAmount: '', setGoalName: '' });
      fetchSavingsGoals(); // Refresh savings list
    } catch (error) {
      setMessage('Error creating savings goal.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSavingsGoals = async () => {
    try {
      const response = await getAllSavings();
      setSavingsGoals(response);
    } catch (error) {
      setMessage('Error fetching savings goals.');
    }
  };

  const handleToggleSavings = () => {
    setShowSavings(!showSavings);
    if (!showSavings) fetchSavingsGoals();
  };

  return (
    <Box sx={{ p: 4 }}>
      

      <Typography variant="h4" gutterBottom>
        Savings Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/sidebar')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      {/* Form to create savings goal */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h6">Create Savings Goal</Typography>
          <form onSubmit={handleCreateSavings}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={savingsData.category}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount Saved"
                  name="amountSaved"
                  type="number"
                  value={savingsData.amountSaved}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Goal Amount"
                  name="goalAmount"
                  type="number"
                  value={savingsData.goalAmount}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Goal Name"
                  name="setGoalName"
                  value={savingsData.setGoalName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="success" fullWidth>
                  {loading ? <CircularProgress size={24} /> : 'Create Savings Goal'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Display message */}
      {message && <Alert severity="info">{message}</Alert>}

      {/* Toggle button to show/hide savings goals */}
      <Button
        variant="contained"
        color={showSavings ? 'secondary' : 'primary'}
        onClick={handleToggleSavings}
        sx={{ mb: 2 }}
      >
        {showSavings ? 'Hide Savings Goals' : 'Show Savings Goals'}
      </Button>

      {/* List of savings goals */}
      {showSavings && (
        <Grid container spacing={3}>
          {savingsGoals.length > 0 ? (
            savingsGoals.map((goal, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{goal.setGoalName}</Typography>
                    <Typography>Category: {goal.category}</Typography>
                    <Typography>Amount Saved: ${goal.amountSaved}</Typography>
                    <Typography>Goal Amount: ${goal.goalAmount}</Typography>
                    <Typography>Progress: {goal.progress}%</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" color="error">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No savings goals found.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Savings;
