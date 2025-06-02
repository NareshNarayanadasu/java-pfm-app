import axios from 'axios';

const API_URL = "http://localhost:8081/api/savings"; // Adjust this according to your backend URL

export const createSavings = async (savingsData) => {
  const token = localStorage.getItem('token');  // Get the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`  // Set the Bearer token in the request headers
      },
    };
  try {
    const response = await axios.post(`${API_URL}/savings`, savingsData,config);
    return response.data;
  } catch (error) {
    throw new Error('Error creating savings');
  }
};

export const getAllSavings = async () => {
  const token = localStorage.getItem('token');  // Get the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`  // Set the Bearer token in the request headers
      },
    };
  try {
    const response = await axios.get(`${API_URL}/all`,config);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching savings');
  }
};
