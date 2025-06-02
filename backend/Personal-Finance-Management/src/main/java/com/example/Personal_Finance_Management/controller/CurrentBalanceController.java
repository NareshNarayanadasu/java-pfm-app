package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.service.CurrentBalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/wallet/balance")
@CrossOrigin("*")
public class CurrentBalanceController {
    @Autowired
    private CurrentBalanceService currentBalanceService;
    @GetMapping
    public ResponseEntity<BigDecimal> getBalance() {
        BigDecimal balance = currentBalanceService.getCurrentBalance();
        return ResponseEntity.ok(balance);
    }
}
