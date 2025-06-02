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

const TransferFunds = () => {
  const [formData, setFormData] = useState({
    fromAccountNumber: "",
    toAccountNumber: "",
    amount: "",
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
        "http://localhost:8081/account/transfer",
        formData,
        config
      );
      setMessage(response.data.message || "Funds transferred successfully!");
      setMessageType("success");
      setFormData({
        fromAccountNumber: "",
        toAccountNumber: "",
        amount: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error transferring funds. Please try again."
      );
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
          Transfer Funds
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <TextField
            fullWidth
            id="fromAccountNumber"
            name="fromAccountNumber"
            label="From Account Number"
            type="number"
            value={formData.fromAccountNumber}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="Enter source account number"
          />
          <TextField
            fullWidth
            id="toAccountNumber"
            name="toAccountNumber"
            label="To Account Number"
            type="number"
            value={formData.toAccountNumber}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="Enter destination account number"
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
            placeholder="Enter amount to transfer"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Transfer Funds
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

export default TransferFunds;
