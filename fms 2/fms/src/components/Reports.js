import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Box, Grid, Card, CardContent, Typography, Alert, Button } from '@mui/material'; // Import MUI components
import { useNavigate } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Reports() {
  const [income, setIncome] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [investments, setInvestments] = useState(null);
  const [summary, setSummary] = useState(null);
  const [savings, setSavings] = useState(null);
  const [error, setError] = useState("");
const navigate = useNavigate(); 
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Set the Bearer token in the request headers
        },
      };

      try {
        const incomeResponse = await axios.get("http://localhost:8081/api/reports/income", config);
        const expensesResponse = await axios.get("http://localhost:8081/api/reports/expenses", config);
        const investmentsResponse = await axios.get("http://localhost:8081/api/reports/investments", config);
        const summaryResponse = await axios.get("http://localhost:8081/api/reports/summary", config);
        const savingsResponse = await axios.get("http://localhost:8081/api/reports/savings", config);

        setIncome(incomeResponse.data);
        setExpenses(expensesResponse.data);
        setInvestments(investmentsResponse.data);
        setSummary(summaryResponse.data);
        setSavings(savingsResponse.data);
        setError("");
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const pieChartData = {
    labels: ['Income', 'Expenses', 'Investments', 'Savings'],
    datasets: [
      {
        data: [
          summary?.totalIncome || 0,
          summary?.totalExpenses || 0,
          summary?.totalInvestments || 0,
          summary?.totalSavings || 0,
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12"],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["Income", "Expenses", "Investments", "Savings"],
    datasets: [
      {
        label: "Amount",
        data: [income || 0, expenses || 0, investments || 0, savings || 0],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12"],
      },
    ],
  };

  return (
    <Box p={3}>
      
            <Typography variant="h4" align="center" gutterBottom>
        Financial Reports
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/sidebar')} sx={{ mb: 2 }}>
              Back to Dashboard
            </Button>
      {error && <Alert severity="error">{error}</Alert>}

      {/* Summary Section */}
      {summary && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Income</Typography>
                <Typography variant="h5" color="primary">${summary.totalIncome.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Current Balance</Typography>
                <Typography variant="h5" color="primary">${(summary.totalIncome - summary.totalExpenses).toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Expenses</Typography>
                <Typography variant="h5" color="error">${summary.totalExpenses.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Investments</Typography>
                <Typography variant="h5" color="primary">${summary.totalInvestments.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Savings</Typography>
                <Typography variant="h5" color="primary">${summary.totalSavings.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Chart Section */}
      <Grid container spacing={3} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={6} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Summary Pie Chart</Typography>
              <Box sx={{ width: '100%', height: 250 }}> {/* Adjust the height to make the pie chart smaller */}
                <Pie data={pieChartData} options={{ 
                  responsive: true, 
                  plugins: { legend: { position: 'top' } },
                  tooltips: { callbacks: { label: (tooltipItem) => `$${tooltipItem.value}` } }
                }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Income vs Expenses (Bar Chart)</Typography>
              <Bar data={barChartData} options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Reports;
