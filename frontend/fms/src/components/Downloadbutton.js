// DownloadButton.js
import React from 'react'
const DownloadButton = () => {
  const handleDownloadExcel = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/excel', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download Excel file');
      }

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'expense_report.xlsx';
      link.click();
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  return (
    <button className="download-btn" onClick={handleDownloadExcel}>
      Download Excel Report
    </button>
  );
};

export default DownloadButton;  // Ensure default export is used
