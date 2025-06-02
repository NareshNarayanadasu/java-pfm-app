package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.entity.Income;
import com.example.Personal_Finance_Management.service.IncomeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/income")
@CrossOrigin("*")
@RequiredArgsConstructor
public class IncomeController {
    @Autowired
    private IncomeService incomeService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllIncome() {
        try {
            return ResponseEntity.ok(incomeService.getAllIncome());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong while fetching all incomes");
        }
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<?> updateIncome(@PathVariable Long id, @RequestBody Income income) {
        try {
            return ResponseEntity.ok(incomeService.updateIncome(id, income));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong while updating income");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIncomeById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(incomeService.getIncomeById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong while fetching income");
        }
    }
}
