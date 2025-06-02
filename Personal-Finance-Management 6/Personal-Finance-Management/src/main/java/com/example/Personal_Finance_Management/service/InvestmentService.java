package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.CurrentBalanceRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.InvestmentRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.TransactionRepo;
import com.example.Personal_Finance_Management.entity.CategoryMultiplier;
import com.example.Personal_Finance_Management.entity.CurrentBalance;
import com.example.Personal_Finance_Management.entity.Investment;
import com.example.Personal_Finance_Management.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InvestmentService {
    @Autowired
    private InvestmentRepo investmentRepo;
    @Autowired
    private CurrentBalanceRepo currentBalanceRepo;
    @Autowired
    private TransactionRepo transactionRepo;
    public Investment saveInvestment(Investment investment) {
        Investment savedInvestment = investmentRepo.save(investment);
        updateCurrentBalanceForInvestment(investment);
        recordTransaction(investment.getCurrentValue(), "investment", investment.getName());
        return savedInvestment;
    }
    private void updateCurrentBalanceForInvestment(Investment investment) {
        // Subtract budget amount from current balance
        CurrentBalance currentBalance = currentBalanceRepo.findById(1L).orElseThrow();
        if (currentBalance.getCurrentBalance() == null) {
            currentBalance.setCurrentBalance(BigDecimal.ZERO);  // Safeguard against null
        }
        if (currentBalance.getCurrentBalance().compareTo(investment.getAmountInvested()) < 0) {
            throw new IllegalStateException("Insufficient balance to post investement!");
        }
        BigDecimal newBalance = currentBalance.getCurrentBalance().subtract(investment.getAmountInvested());
        newBalance = newBalance.add(investment.getCurrentValue());  // Add current value of the investment
        currentBalance.setCurrentBalance(newBalance);
        currentBalanceRepo.save(currentBalance);  // Save the updated entity

    }
    private void recordTransaction(BigDecimal amount, String type, String category) {
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setType(type);
        transaction.setCategory(category);
        transaction.setDate(LocalDate.now());
        transactionRepo.save(transaction);
    }



    public void deleteInvestment(Long id){
        investmentRepo.deleteById(id);
    }

    public List<Investment> getALlInvestments() {
       List<Investment> list=investmentRepo.findAll();
       return list;
    }


}
