package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.service.ExcelReportService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class ExcelReportController {
    @Autowired
    private ExcelReportService excelReportService;
    @GetMapping("/excel")

    public void downloadExcelReport(HttpServletResponse response) {
        try {
            // Calls the service to generate the report
            excelReportService.generateExcelReport(response);

            // Set the response content type and filename for the download
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=expense_report.xlsx");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
