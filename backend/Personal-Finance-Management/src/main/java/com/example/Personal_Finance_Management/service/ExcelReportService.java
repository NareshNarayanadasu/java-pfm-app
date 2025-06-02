package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.TransactionRepo;
import com.example.Personal_Finance_Management.entity.Transaction;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ExcelReportService {

    @Autowired
    TransactionRepo transactionRepo;
    public void generateExcelReport(HttpServletResponse response) throws IOException {
        // Fetch all transactions from the database
        List<Transaction> transactions = transactionRepo.findAll();

        // Create a new workbook and sheet
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Transactions");

        // Create header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Type", "Amount", "Category", "Date"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(createHeaderCellStyle(workbook)); // Apply style to header cells
        }

        // Populate the data rows
        int rowIndex = 1;
        for (Transaction transaction : transactions) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(transaction.getId());
            row.createCell(1).setCellValue(transaction.getType());
            row.createCell(2).setCellValue(transaction.getAmount().doubleValue());
            row.createCell(3).setCellValue(transaction.getCategory());
            row.createCell(4).setCellValue(transaction.getDate().toString());  // Ensure date format
        }

        // Set response headers and content type for Excel download
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=transactions.xlsx");

        // Write the Excel file to the response output stream
        workbook.write(response.getOutputStream());
        workbook.close();  // Close the workbook after writing to response
    }

    private CellStyle createHeaderCellStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();

        // Apply bold font and size for header
        org.apache.poi.ss.usermodel.Font font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 12);
        style.setFont(font);

        return style;
    }
}
