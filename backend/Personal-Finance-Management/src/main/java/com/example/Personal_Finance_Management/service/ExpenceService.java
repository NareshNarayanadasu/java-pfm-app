package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.CurrentBalanceRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.ExpenceRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.TransactionRepo;
import com.example.Personal_Finance_Management.entity.CurrentBalance;
import com.example.Personal_Finance_Management.entity.Expence;
import com.example.Personal_Finance_Management.entity.Transaction;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenceService {
    @Autowired
    private  ExpenceRepo expenceRepo;
    @Autowired
    private CurrentBalanceRepo currentBalanceRepo;
    @Autowired
    private TransactionRepo transactionRepo;

    public void saveExpense(Expence expense) {
        Expence savedExpense = expenceRepo.save(expense);
        updateCurrentBalanceForExpense(expense.getAmount());
        recordTransaction(expense.getAmount(), "expense", expense.getCategory());
    }
    private void updateCurrentBalanceForExpense(BigDecimal expenseAmount) {
        // Subtract expense amount from current balance
        CurrentBalance currentBalance = currentBalanceRepo.findById(1L).orElseThrow();
        if (currentBalance.getCurrentBalance().compareTo(expenseAmount) < 0) {
            throw new IllegalStateException("Insufficient balance to cover the expense!");

        }
        BigDecimal newBalance = currentBalance.getCurrentBalance().subtract(expenseAmount);
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
    private Expence saveOrUpdate(Expence expence, Expence newExpence) {
        expence.setDate(newExpence.getDate());
        expence.setAmount(newExpence.getAmount());
        expence.setCategory(newExpence.getCategory());
        return expenceRepo.save(expence);
    }

    public List<Expence> getAllExpence() {
        // Sorting by date in ascending order
        return expenceRepo.findAll().stream()
                .sorted(Comparator.comparing(Expence::getDate))
                .collect(Collectors.toList());
    }

    public Expence getByIdExpence(Long id) {
        Optional<Expence> optionalExpence = expenceRepo.findById(id);
        if (optionalExpence.isPresent()) {
            return optionalExpence.get();
        } else {
            throw new EntityNotFoundException("Entity with this ID is not found");
        }
    }

    public Expence updateExpence(Long id, Expence expence) {
        Optional<Expence> optionalExpence = expenceRepo.findById(id);
        if (optionalExpence.isPresent()) {
            return saveOrUpdate(optionalExpence.get(), expence);
        } else {
            throw new EntityNotFoundException("Entity with this ID is not found");
        }
    }

    public void deleteExpence(Long id) {
        Optional<Expence> optionalExpence = expenceRepo.findById(id);
        if (optionalExpence.isPresent()) {
            expenceRepo.deleteById(id);
        } else {
            throw new EntityNotFoundException("Entity with this ID is not found");
        }
    }
}
