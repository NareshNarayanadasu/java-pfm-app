import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Income() {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    // Fetching income data from the API
    axios.get('http://localhost:8081/api/income/all')  // Adjust the URL based on your backend
      .then(response => setIncomeData(response.data))
      .catch(error => console.error('There was an error fetching the income data!', error));
  }, []);

  return (
    <div>
      <h2>Income</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.map((income, index) => (
            <tr key={index}>
              <td>{income.category}</td>
              <td>{income.amount}</td>
              <td>{income.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Income;
