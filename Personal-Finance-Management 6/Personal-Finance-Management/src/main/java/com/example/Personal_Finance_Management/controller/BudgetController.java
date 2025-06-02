package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.dto.BudgetRequest;
import com.example.Personal_Finance_Management.entity.Budget;
import com.example.Personal_Finance_Management.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/budget")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;
    @PostMapping("/budget")
    public ResponseEntity<String> postBudget(@RequestBody Budget budget) {
        try {
            budgetService.createBudget(budget);
            if (budget.isOverSpending()) {
                return ResponseEntity.ok("Alert: You have exceeded your budget!");
            }
            return ResponseEntity.ok("Budget created successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the budget.");
        }
    }


    @PostMapping("/spend")
    public ResponseEntity<String> spendFromBudget(@RequestBody BudgetRequest BudgetRequest) {
        try {
            budgetService.spendFromBudget(BudgetRequest.getActualAmountSpent(), BudgetRequest.getCategory());
            return ResponseEntity.ok("Amount spent successfully from the budget.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while spending from the budget.");
        }
    }


    @GetMapping("/allBudgets")
    public List<Budget> getAll(){
        return budgetService.getAllBudgets();
    }
}
