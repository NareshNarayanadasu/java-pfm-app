package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.dto.ExpenceCategorySummary;

import com.example.Personal_Finance_Management.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("api/reports")
public class ReportsController {
   @Autowired
    ReportsService reportsService;

    @GetMapping("/income")
    public ResponseEntity<BigDecimal> getTotalIncome() {
        BigDecimal totalIncome = reportsService.getTotalIncome();
        return ResponseEntity.ok(totalIncome);
    }
    @GetMapping("/expenses")
    public ResponseEntity<BigDecimal> getTotalExpenses() {
        BigDecimal totalExpenses = reportsService.getTotalExpenses();
        return ResponseEntity.ok(totalExpenses);
    }
    @GetMapping("/savings")
    public ResponseEntity<BigDecimal> getTotalSavings() {
        BigDecimal totalExpenses = reportsService.getTotalSavings();
        return ResponseEntity.ok(totalExpenses);
    }
    @GetMapping("/investments")
    public ResponseEntity<BigDecimal> getTotalInvestments() {
        BigDecimal totalInvestments = reportsService.getTotalInvestments();
        return ResponseEntity.ok(totalInvestments);
    }
    @GetMapping("/summary")
    public ResponseEntity<Map<String, BigDecimal>> getSummary() {
        Map<String, BigDecimal> summary = new HashMap<>();
        summary.put("totalIncome", reportsService.getTotalIncome());
        summary.put("totalExpenses", reportsService.getTotalExpenses());
        summary.put("totalInvestments", reportsService.getTotalInvestments());
        summary.put("totalSavings", reportsService.getTotalSavings());
        return ResponseEntity.ok(summary);
    }
    @GetMapping("/expenseCategories")
    public ResponseEntity<List<ExpenceCategorySummary>> getExpenseCategorySummary() {
        List<ExpenceCategorySummary> summary = reportsService.getExpenseCategorySummary();
        return ResponseEntity.ok(summary);
    }
}
