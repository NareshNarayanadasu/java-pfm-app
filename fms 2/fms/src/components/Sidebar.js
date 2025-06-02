import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Box } from "@mui/material";
import { styled } from "@mui/system";

// Custom styles for the Drawer and Button components
const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    backgroundColor: "#2C3E50", // Darker background color
    color: "#ECF0F1", // Light text color for better contrast
    top: "64px", // Pushes the sidebar below the navbar (assuming navbar height is 64px)
    height: "calc(100% - 64px)", // Adjust height to fill the remaining screen below the navbar
    display: "flex",
    flexDirection: "column",
    padding: "16px 16px",
    borderRight: "none", // Clean up border
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for a more professional look
  },
}));

const ContentContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center", // Centering the content horizontally
  alignItems: "center", // Centering the content vertically
  height: "100vh",
  backgroundImage: "url('https://www.berlinsbi.com/uploads/sites/2/2021/12/7-very-good-reasons-to-do-master-s-in-finance.jpg')", // Image URL for the background
  backgroundSize: "cover", // Cover the full space
  backgroundPosition: "center",
  opacity: 0.8, // Slight overlay to improve readability
  color: "#fff", // Ensure content is visible
  fontSize: "24px", // More readable text size
  textAlign: "center",
  boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.4)", // Subtle shadow inside content area
  borderRadius: "8px", // Rounded corners for content area
});

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: 16,
  backgroundColor: "#3498DB", // Professional blue color for the button
  color: "#fff", // White text on button
  '&:hover': {
    backgroundColor: "#2980B9", // Darker blue on hover
  },
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Added subtle shadow to buttons
}));

const LogoutButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: 10,
  backgroundColor: "#E74C3C", // Red color for logout
  color: "#fff", // White text
  '&:hover': {
    backgroundColor: "#C0392B", // Darker red on hover
  },
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Added subtle shadow to buttons
}));

const Sidebar = ({ onLogout }) => {
  const handleDownloadExcel = async () => {
    onLogout();
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch("http://localhost:8081/api/excel", {
        method: "GET",
        headers: config.headers,
      });

      if (!response.ok) throw new Error("Failed to download Excel file");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "expense_report.xlsx";
      link.click();
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  const sidebarItems = [
    { to: "/currentbalance", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHxVgDheyMbvmzwvY2PcIjg0mH1fKTbSj7w&s", label: "Wallet" },
    { to: "/accountSection", icon: "https://cdn-icons-png.flaticon.com/512/270/270013.png", label: "Account" },
    { to: "/budget", icon: "https://cdn-icons-png.flaticon.com/128/11605/11605616.png", label: "Budget" },
    { to: "/investment", icon: "https://cdn-icons-png.flaticon.com/128/2300/2300436.png", label: "Investment" },
    { to: "/saving", icon: "https://cdn-icons-png.flaticon.com/128/2480/2480719.png", label: "Savings" },
    { to: "/reports", icon: "https://cdn-icons-png.flaticon.com/128/10397/10397230.png", label: "Reports" },
    { to: "/expense", icon: "https://cdn-icons-png.flaticon.com/128/15448/15448866.png", label: "Expenses" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <DrawerStyled variant="permanent" anchor="left">
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.to}
              key={item.label}
              sx={{
                "&:hover": {
                  backgroundColor: "#34495E", // Darker shade on hover
                  borderRadius: "8px", // Rounded corners on hover for a modern effect
                },
              }}
            >
              <ListItemIcon>
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{
                    width: 30, // Consistent icon size
                    height: 30,
                    borderRadius: "50%", // Circular icons for a modern look
                    backgroundColor: "#34495E", // Dark background color for the icon
                    padding: "6px", // Padding inside icon
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  fontWeight: "bold", // Bold font for item text
                  color: "#ECF0F1", // Lighter text color for readability
                  paddingLeft: "12px", // Padding for text
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ padding: "16px" }}>
          <ButtonStyled variant="contained" color="primary" fullWidth onClick={handleDownloadExcel}>
            Download Transactions
          </ButtonStyled>
          <LogoutButtonStyled variant="outlined" onClick={onLogout} fullWidth>
            Logout
          </LogoutButtonStyled>
        </Box>
      </DrawerStyled>

      {/* Content Section with Background Image */}
      <ContentContainer>
        <Box sx={{ textAlign: "center", fontWeight: "bold", fontSize: "32px" }}>
          Welcome to Your Dashboard
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default Sidebar;




// import React from "react";
// import { Link } from "react-router-dom";
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Box } from "@mui/material";
// import { styled } from "@mui/system";

// // Custom styles for the Drawer and Button components
// const DrawerStyled = styled(Drawer)(({ theme }) => ({
//   width: 250,
//   flexShrink: 0,
//   "& .MuiDrawer-paper": {
//     width: 250,
//     backgroundColor: "#F3E8DD", // Soft beige background
//     color: "#3D3D3D", // Darker text for contrast
//     top: "64px",
//     height: "calc(100% - 64px)",
//     display: "flex",
//     flexDirection: "column",
//     padding: "16px 16px",
//     borderRight: "none",
//     boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
//     borderRadius: "0 16px 16px 0", // Smooth edges
//   },
// }));

// const SidebarButton = styled(Button)(({ theme }) => ({
//   marginTop: 16,
//   backgroundColor: "#D68060", // Soft brown button
//   color: "#fff",
//   '&:hover': {
//     backgroundColor: "#B66347", // Slightly darker shade
//   },
//   borderRadius: "12px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
// }));

// const LogoutButtonStyled = styled(Button)(({ theme }) => ({
//   marginTop: 10,
//   backgroundColor: "#E74C3C",
//   color: "#fff",
//   '&:hover': {
//     backgroundColor: "#C0392B",
//   },
//   borderRadius: "12px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
// }));

// const Sidebar = ({ onLogout }) => {
//   const sidebarItems = [
//     { to: "/currentbalance", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHxVgDheyMbvmzwvY2PcIjg0mH1fKTbSj7w&s", label: "Wallet" },
//         { to: "/accountSection", icon: "https://cdn-icons-png.flaticon.com/512/270/270013.png", label: "Account" },
//         { to: "/budget", icon: "https://cdn-icons-png.flaticon.com/128/11605/11605616.png", label: "Budget" },
//         { to: "/investment", icon: "https://cdn-icons-png.flaticon.com/128/2300/2300436.png", label: "Investment" },
//         { to: "/saving", icon: "https://cdn-icons-png.flaticon.com/128/2480/2480719.png", label: "Savings" },
//         { to: "/reports", icon: "https://cdn-icons-png.flaticon.com/128/10397/10397230.png", label: "Reports" },
//         { to: "/expense", icon: "https://cdn-icons-png.flaticon.com/128/15448/15448866.png", label: "Expenses" },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <DrawerStyled variant="permanent" anchor="left">
//         <List>
//           {sidebarItems.map((item) => (
//             <ListItem
//               button
//               component={Link}
//               to={item.to}
//               key={item.label}
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#EAD8C0", // Lighter beige on hover
//                   borderRadius: "8px",
//                 },
//               }}
//             >
//               <ListItemText
//                 primary={item.label}
//                 sx={{ fontWeight: "bold", color: "#3D3D3D" }}
//               />
//             </ListItem>
//           ))}
//         </List>
//         <Box sx={{ padding: "16px" }}>
//           <SidebarButton variant="contained" fullWidth>
//             Create New Project
//           </SidebarButton>
//           <LogoutButtonStyled variant="outlined" onClick={onLogout} fullWidth>
//             Logout
//           </LogoutButtonStyled>
//         </Box>
//       </DrawerStyled>
//     </Box>
//   );
// };

// export default Sidebar;
