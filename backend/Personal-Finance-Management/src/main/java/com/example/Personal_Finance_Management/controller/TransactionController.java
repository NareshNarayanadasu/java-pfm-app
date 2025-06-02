package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.ExpenceRepository.TransactionRepo;
import com.example.Personal_Finance_Management.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TransactionController {
    @Autowired
    private TransactionRepo transactionRepo;
    @GetMapping("/allTransactions")
    public List<Transaction> getAll(){
        List<Transaction> list1= transactionRepo.findAll();
        return  list1;
    }
}
