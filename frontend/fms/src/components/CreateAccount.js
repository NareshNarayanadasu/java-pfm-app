import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, MenuItem, Alert } from "@mui/material";

function CreateAccount() {
  const [formData, setFormData] = useState({
    accountNumber: "",
    account_holder_name: "",
    accountType: "",
    initialBalance: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // 'success' or 'error'

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
        "http://localhost:8081/account/create",
        formData,
        config
      );
      console.log("Response:", response.data);
      setMessage("Account created successfully!");
      setMessageType("success");
      setFormData({
        accountNumber: "",
        account_holder_name: "",
        accountType: "",
        initialBalance: "",
      });
    } catch (error) {
      setMessage(
        "Error creating account: " +
          (error.response ? error.response.data.message : error.message)
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
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <TextField
            fullWidth
            id="accountNumber"
            name="accountNumber"
            label="Account Number"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            margin="normal"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*", // Ensures numeric-only input
            }}
          />
          <TextField
            fullWidth
            id="account_holder_name"
            name="account_holder_name"
            label="Account Holder Name"
            value={formData.account_holder_name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            select
            fullWidth
            id="accountType"
            name="accountType"
            label="Account Type"
            value={formData.accountType}
            onChange={handleChange}
            required
            margin="normal"
          >
            <MenuItem value="" disabled>
              Select Account Type
            </MenuItem>
            <MenuItem value="savings">Savings</MenuItem>
            <MenuItem value="current">Current</MenuItem>
            <MenuItem value="fixed">Fixed Deposit</MenuItem>
            <MenuItem value="recurring">Recurring Deposit</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <TextField
            fullWidth
            id="initialBalance"
            name="initialBalance"
            label="Initial Balance"
            type="number"
            value={formData.initialBalance}
            onChange={handleChange}
            required
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
        </Box>
        {message && (
          <Alert severity={messageType} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default CreateAccount;
