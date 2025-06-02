package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.BudgetRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.CurrentBalanceRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.TransactionRepo;
import com.example.Personal_Finance_Management.entity.Budget;
import com.example.Personal_Finance_Management.entity.CurrentBalance;
import com.example.Personal_Finance_Management.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepo budgetRepo;
    @Autowired
    private CurrentBalanceRepo currentBalanceRepo;
    @Autowired
    private TransactionRepo transactionRepo;
    public void createBudget(Budget budget) {
        budget.setId(null); // This will prevent Hibernate from treating it as an update

        Optional<Budget> existingBudget = budgetRepo.findByCategory(budget.getCategory());

        if (existingBudget.isPresent()) {
            throw new IllegalStateException("Budget for the category '" + budget.getCategory() + "' already exists.");
        }

        budgetRepo.save(budget);

        updateCurrentBalanceForBudget(budget.getAmount());

        recordTransaction(budget.getAmount(), "budget", budget.getCategory());
    }




    public void spendFromBudget(BigDecimal spendAmount, String category) {
        Budget budget = budgetRepo.findByCategory(category)
                .orElseThrow(() -> new IllegalArgumentException("Budget for category " + category + " not found."));

        if (budget.getAmount().compareTo(spendAmount) < 0) {
            throw new IllegalStateException("Insufficient allocated budget for category: " + category);
        }

        BigDecimal updatedBudgetAmount = budget.getAmount().subtract(spendAmount);
        budget.setAmount(updatedBudgetAmount);

        BigDecimal updatedActualSpent = budget.getActualAmountSpent().add(spendAmount);
        budget.setActualAmountSpent(updatedActualSpent);

        budgetRepo.save(budget);

        recordTransaction(spendAmount, "expense", category);
    }


    public List<Budget> getAllBudgets(){
        return budgetRepo.findAll();
    }

    private void updateCurrentBalanceForBudget(BigDecimal budgetAmount) {
        CurrentBalance currentBalance = currentBalanceRepo.findById(1L).orElseThrow();
        if (currentBalance.getCurrentBalance().compareTo(budgetAmount) < 0) {
            throw new IllegalStateException("Insufficient balance to save!");
        }
        BigDecimal newBalance = currentBalance.getCurrentBalance().subtract(budgetAmount);
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
