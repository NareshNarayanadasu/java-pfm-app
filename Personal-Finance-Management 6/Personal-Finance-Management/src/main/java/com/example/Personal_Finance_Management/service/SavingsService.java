package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.CurrentBalanceRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.SavingsRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.TransactionRepo;
import com.example.Personal_Finance_Management.dto.SavingsRequest;
import com.example.Personal_Finance_Management.entity.CurrentBalance;
import com.example.Personal_Finance_Management.entity.Savings;
import com.example.Personal_Finance_Management.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class SavingsService {
    @Autowired
    private SavingsRepo savingsRepo;
    @Autowired
    private CurrentBalanceRepo currentBalanceRepo;
    @Autowired
    private TransactionRepo transactionRepo;
    public Savings saveSavings(SavingsRequest savingsRequest) {
        if (savingsRequest.getGoalAmount() == null || savingsRequest.getAmountSaved() == null) {
            throw new IllegalStateException("Goal amount and saved amount must be provided.");
        }

        // Find all existing savings records by category
        List<Savings> existingSavingsList = savingsRepo.findByCategory(savingsRequest.getCategory());

        if (existingSavingsList.isEmpty()) {
            // No existing savings record, create a new one
            Savings newSavings = new Savings();
            newSavings.addAmountSaved(savingsRequest.getAmountSaved());
            newSavings.setCategory(savingsRequest.getCategory());
            newSavings.setGoalAmount(savingsRequest.getGoalAmount());
            newSavings.setSetGoalName(savingsRequest.getSetGoalName());
            savingsRepo.save(newSavings);
            updateCurrentBalanceForSavings(savingsRequest.getAmountSaved());
            recordTransaction(savingsRequest.getAmountSaved(), "savings",savingsRequest.getCategory());
            return newSavings;
        } else {
            // Sum up the existing amounts and update the first record
            Savings existingSavings = existingSavingsList.get(0); // Just using the first record, adjust as needed
            existingSavings.addAmountSaved(savingsRequest.getAmountSaved());
            existingSavings.setGoalAmount(savingsRequest.getGoalAmount());
            existingSavings.setSetGoalName(savingsRequest.getSetGoalName());
            savingsRepo.save(existingSavings);
            updateCurrentBalanceForSavings(savingsRequest.getAmountSaved());
            recordTransaction(savingsRequest.getAmountSaved(), "savings",savingsRequest.getCategory());
            return existingSavings;
        }

    }
    private void updateCurrentBalanceForSavings(BigDecimal savingsAmount) {
        CurrentBalance currentBalance = currentBalanceRepo.findById(1L).orElseThrow();
        if (currentBalance.getCurrentBalance().compareTo(savingsAmount) < 0) {
            throw new IllegalStateException("Insufficient balance to save!");
        }
        BigDecimal newBalance = currentBalance.getCurrentBalance().subtract(savingsAmount);
        currentBalance.setCurrentBalance(newBalance);
        currentBalanceRepo.save(currentBalance);
    }
    private void recordTransaction(BigDecimal amount, String type, String category) {
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setType(type);
        transaction.setCategory(category);
        transaction.setDate(LocalDate.now());
        transactionRepo.save(transaction);
    }
}
