import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, Alert, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

function ViewAccountDetails() {
  const [accountNumber, setAccountNumber] = useState(""); // To store the entered account number
  const [accountDetails, setAccountDetails] = useState(null); // To store the fetched account details
  const [message, setMessage] = useState(""); // To display messages (e.g., error or success)
  const [messageType, setMessageType] = useState("info"); // 'info', 'error', or 'success'

  const handleChange = (e) => {
    setAccountNumber(e.target.value);
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
      const response = await axios.get(`http://localhost:8081/account/${accountNumber}`, config);
      setAccountDetails(response.data); // Store the account details in state
      setMessage("Account details fetched successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(
        "Account not found or error occurred: " +
          (error.response ? error.response.data.message : error.message)
      );
      setMessageType("error");
      setAccountDetails(null); // Clear any previous account details
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
          View Account Details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <TextField
            fullWidth
            id="accountNumber"
            name="accountNumber"
            label="Account Number"
            value={accountNumber}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="Enter Account Number"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            View Details
          </Button>
        </Box>
        {message && (
          <Alert severity={messageType} sx={{ mt: 2, width: "100%" }}>
            {message}
          </Alert>
        )}
        {accountDetails && (
          <Box sx={{ mt: 4, width: "100%" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Account Details:
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Account Number</strong></TableCell>
                    <TableCell>{accountDetails.accountNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Account Holder Name</strong></TableCell>
                    <TableCell>{accountDetails.account_holder_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Account Type</strong></TableCell>
                    <TableCell>{accountDetails.accountType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Balance</strong></TableCell>
                    <TableCell>{accountDetails.balance}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default ViewAccountDetails;
