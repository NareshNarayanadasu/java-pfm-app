package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.ExpenceRepository.AccountRepository;
import com.example.Personal_Finance_Management.dto.*;
import com.example.Personal_Finance_Management.entity.Account;
import com.example.Personal_Finance_Management.service.AccountService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestBody AccountCreateRequest request) {
        try {
            Account savedAccount = accountService.createAccountAndUpdateIncome(request);
            return ResponseEntity.ok(savedAccount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating account: " + e.getMessage());
        }
    }

    @PostMapping("/addIncome")
    public ResponseEntity<IncomeResponse> addIncome(@RequestBody IncomeRequest incomeRequest) {
      IncomeResponse response=accountService.addAccountBalanceToIncome(incomeRequest);
      return ResponseEntity.ok(response);

    }
    @PostMapping("/transfer")
    public ResponseEntity<String> transferFunds(@RequestBody TransferRequest transferRequest) {
        try {
            accountService.transferFunds(transferRequest);
            return ResponseEntity.ok("Transfer completed successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{accountNumber}")
    public ResponseEntity<AccountResponse> getAccountByAccountNumber(@PathVariable String accountNumber) {
        AccountResponse accountResponse = accountService.getAccountByAccountNumber(accountNumber);
        return ResponseEntity.ok(accountResponse);
    }


}

