
// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, Grid } from "@mui/material";
import './styles.css';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    onLogin();
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        username,
        password,
      });

      const token = response.data; // Assuming token is in response.data.token
      localStorage.setItem("token", token); // Store the token in localStorage

      navigate("/"); // Redirect to the dashboard or home page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error during login");
    }
  };

  return (
    <div className="page-background">
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleLogin} style={{ width: "100%", marginTop: "20px" }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        {errorMessage && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{errorMessage}</Typography>}
      </Box>
    </Container>
    </div>
  );
};

export default Login;
