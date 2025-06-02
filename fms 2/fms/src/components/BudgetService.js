import axios from 'axios';


const API_URL = 'http://localhost:8081/api/budget';

export const createBudget = async (budgetData) => {
  const token = localStorage.getItem("token");
    
    // Set Authorization header with the Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  try {
    const response = await axios.post(`${API_URL}/budget`, budgetData,config);
    return response.data;
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error;
  }
};

export const spendFromBudget = async (spendData) => {
  const token = localStorage.getItem("token");
    
    // Set Authorization header with the Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  try {
    const response = await axios.post(`${API_URL}/spend`, spendData,config);
    return response.data;
  } catch (error) {
    console.error('Error spending from budget:', error);
    throw error;
  }
};

export const getAllBudgets = async () => {
  const token = localStorage.getItem("token");
    
    // Set Authorization header with the Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  try {
    const response = await axios.get(`${API_URL}/allBudgets`,config);
    return response.data;
  } catch (error) {
    console.error('Error fetching all budgets:', error);
    throw error;
  }
};
