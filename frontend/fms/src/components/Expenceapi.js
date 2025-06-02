
import axios from 'axios';

const BASE_URL = "http://localhost:8081/api/expence"; // Your backend URL

// Helper function to get the token from localStorage and configure the headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');  // Get the token from localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Set the Bearer token in the request headers
    },
  };
};

export const getAllExpenses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw new Error('Failed to fetch expenses');
  }
};

export const createExpense = async (expense) => {
  try {
    const response = await axios.post(`${BASE_URL}/expense`, expense, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw new Error('Failed to create expense');
  }
};

export const getExpenseById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching expense:', error);
    throw new Error('Failed to fetch expense');
  }
};

export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${BASE_URL}/put/${id}`, expense, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw new Error('Failed to update expense');
  }
};

export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw new Error('Failed to delete expense');
  }
};
