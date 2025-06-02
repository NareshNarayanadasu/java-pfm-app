import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="fixed" color="default">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="logo.png" alt="Logo" style={{ height: 50, marginRight: 10 }} />
          <Typography variant="h6">FINANCE MANAGEMENT SYSTEM</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button sx={{ color: "#0D47A1" }}  onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button sx={{ color: "#0D47A1" }} onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
