import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography, Grid } from "@mui/material";
import CreateAccount from './CreateAccount';
import AddIncome from './AddIncome';
import TransferFunds from './TransferFunds';
import ViewAccountDetails from './ViewAccountDetails';
import { useNavigate } from "react-router-dom";

const AccountSection = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleCardClick = (section) => {
    setSelectedSection(section);
  };
  
  const navigate = useNavigate();
  
  const renderSectionContent = () => {
    switch (selectedSection) {
      case "createAccount":
        return <CreateAccount />;
      case "accountDetails":
        return <ViewAccountDetails />;
      case "addIncome":
        return <AddIncome />;
      case "transferFunds":
        return <TransferFunds />;
      default:
        return <div>Select an option to view details</div>;
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 2, backgroundImage: "url('https://www.m1xchange.com/thought-xchange/wp-content/uploads/2023/09/shutterstock_2139780347-scaled.jpg')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#fff" }}>
        Account Options
      </Typography>
      
      <Button variant="contained" color="primary" onClick={() => navigate('/sidebar')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      
      <Grid container spacing={2} justifyContent="center">
        {/* Create Account Card */}
        <Grid item>
          <Card
            sx={{
              width: 150,
              cursor: "pointer",
              textAlign: "center",
              "&:hover": { boxShadow: 6 },
              backgroundColor: "#ffffffcc", // Slight transparency for the card
            }}
            onClick={() => handleCardClick("createAccount")}
          >
            <CardContent>
              <img
                src="https://i.pinimg.com/736x/5e/9b/90/5e9b90abe8635df3d92f0cc57aad25d6.jpg"
                alt="Create Account"
                style={{ width: "50px", height: "50px", marginBottom: "10px" }}
              />
              <Typography variant="body1">Create Account</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* View Account Card */}
        <Grid item>
          <Card
            sx={{
              width: 150,
              cursor: "pointer",
              textAlign: "center",
              "&:hover": { boxShadow: 6 },
              backgroundColor: "#ffffffcc", // Slight transparency for the card
            }}
            onClick={() => handleCardClick("accountDetails")}
          >
            <CardContent>
              <img
                src="https://cdn-icons-png.flaticon.com/128/7876/7876402.png"
                alt="View Account"
                style={{ width: "50px", height: "50px", marginBottom: "10px" }}
              />
              <Typography variant="body1">View Account</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Add Income Card */}
        <Grid item>
          <Card
            sx={{
              width: 150,
              cursor: "pointer",
              textAlign: "center",
              "&:hover": { boxShadow: 6 },
              backgroundColor: "#ffffffcc", // Slight transparency for the card
            }}
            onClick={() => handleCardClick("addIncome")}
          >
            <CardContent>
              <img
                src="https://cdn-icons-png.flaticon.com/128/12287/12287173.png"
                alt="Add Income"
                style={{ width: "50px", height: "50px", marginBottom: "10px" }}
              />
              <Typography variant="body1">Add Income</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Transfer Funds Card */}
        <Grid item>
          <Card
            sx={{
              width: 150,
              cursor: "pointer",
              textAlign: "center",
              "&:hover": { boxShadow: 6 },
              backgroundColor: "#ffffffcc", // Slight transparency for the card
            }}
            onClick={() => handleCardClick("transferFunds")}
          >
            <CardContent>
              <img
                src="https://i.pinimg.com/736x/e8/25/0e/e8250e334e07c75ddceab38cda956f2c.jpg"
                alt="Transfer Funds"
                style={{ width: "50px", height: "50px", marginBottom: "10px" }}
              />
              <Typography variant="body1">Transfer Funds</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Render the selected section content below */}
      <Box sx={{ marginTop: 4, padding: 2, backgroundColor: "#ffffffcc", borderRadius: "8px" }}>
        <Typography variant="h5" gutterBottom sx={{ color: "#333" }}>
          {selectedSection ? selectedSection.replace(/([A-Z])/g, " $1").trim() : "Select an option to view details"}
        </Typography>
        {renderSectionContent()}
      </Box>
    </Box>
  );
};

export default AccountSection;
