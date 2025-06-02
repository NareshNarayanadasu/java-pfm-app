import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Income from './components/Income';
import Investment from './components/Investment';
import CreateAccount from './components/CreateAccount';
import AddIncome from './components/AddIncome';
import TransferFunds from './components/TransferFunds';
import ViewAccountDetails from './components/ViewAccountDetails';
import Budget from './components/Budget';
import Savings from './components/Savings';
import Reports from './components/Reports';
import CurrentBalance from './components/CurrentBalance';
import AccountSection from './components/AccountSection';
import ExpenseManager from './components/ExpenceManager';
import Navbar from './components/Navbar';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="main-content">
          <Routes>
            {/* Dashboard route - accessible only if not logged in */}
            <Route
              path="/"
              element={!isAuthenticated ? <Dashboard /> : <Navigate to="/sidebar" />}
            />

            {/* Registration and Login routes */}
            <Route path="/register" element={<Registration />} />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />

            {/* Sidebar route - accessible only if logged in */}
            <Route
              path="/sidebar"
              element={isAuthenticated ? <Sidebar onLogout={handleLogout} /> : <Navigate to="/" />}
            />

            {/* Other routes - accessible only if logged in */}
            <Route
              path="/income"
              element={isAuthenticated ? <Income /> : <Navigate to="/" />}
            />
            <Route
              path="/investment"
              element={isAuthenticated ? <Investment /> : <Navigate to="/" />}
            />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/transfer-funds" element={<TransferFunds />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route
              path="/account-details"
               element={<ViewAccountDetails />}/>
           
            <Route
              path="/budget"
              element={isAuthenticated ? <Budget /> : <Navigate to="/" />}
            />
            <Route
              path="/saving"
              element={isAuthenticated ? <Savings /> : <Navigate to="/" />}
            />
            <Route
              path="/reports"
              element={isAuthenticated ? <Reports /> : <Navigate to="/" />}
            />
            <Route
              path="/currentbalance"
              element={isAuthenticated ? <CurrentBalance /> : <Navigate to="/" />}
            />
            <Route path="/accountSection" element={<AccountSection />} />

            <Route
              path="/expense"
              element={isAuthenticated ? <ExpenseManager /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
