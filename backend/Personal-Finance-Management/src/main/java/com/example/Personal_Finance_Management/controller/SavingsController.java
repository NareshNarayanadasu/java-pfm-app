package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.ExpenceRepository.SavingsRepo;
import com.example.Personal_Finance_Management.dto.SavingsRequest;
import com.example.Personal_Finance_Management.entity.Savings;
import com.example.Personal_Finance_Management.exception.ResourceNotFoundException;
import com.example.Personal_Finance_Management.service.SavingsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/savings")
public class SavingsController {
@Autowired
private SavingsService savingsService;
@Autowired
private SavingsRepo savingsRepo;
    @PostMapping("/savings")
    public ResponseEntity<Savings> postSavings(@RequestBody SavingsRequest savingsRequest) {
        Savings savedSavings = savingsService.saveSavings(savingsRequest);
        return ResponseEntity.ok(savedSavings);
    }
    @GetMapping("/all")
    public List<Savings> getSavingsGoal() {
        // Retrieve the savings goal by ID
        List<Savings> savingsGoal = savingsRepo.findAll();
        return savingsGoal;
    }
}
