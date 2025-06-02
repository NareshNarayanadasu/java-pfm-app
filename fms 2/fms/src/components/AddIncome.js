import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";

const AddIncome = () => {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    accountNumber: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // 'success', 'error', etc.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/account/addIncome",
        formData,
        config
      );

      if (response && response.data) {
        setMessage("Income added successfully!");
        setMessageType("success");
        setFormData({
          category: "",
          amount: "",
          date: "",
          accountNumber: "",
        });
      }
    } catch (error) {
      if (error.response) {
        setMessage("Error adding income: " + (error.response.data.message || error.response.data));
      } else if (error.request) {
        setMessage("Error adding income: No response from server.");
      } else {
        setMessage("Error adding income: " + error.message);
      }
      setMessageType("error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add Income
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <TextField
            fullWidth
            id="category"
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="Enter category"
          />
          <TextField
            fullWidth
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="Enter amount"
          />
          <TextField
            fullWidth
            id="date"
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="accountNumber"
            name="accountNumber"
            label="Account Number"
            type="number"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="Enter account number"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Income
          </Button>
        </Box>
        {message && (
          <Alert severity={messageType} sx={{ mt: 2, width: "100%" }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AddIncome;
