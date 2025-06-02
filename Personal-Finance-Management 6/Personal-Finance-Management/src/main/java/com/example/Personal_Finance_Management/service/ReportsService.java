package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.ExpenceRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.IncomeRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.InvestmentRepo;
import com.example.Personal_Finance_Management.ExpenceRepository.SavingsRepo;
import com.example.Personal_Finance_Management.dto.ExpenceCategorySummary;
import com.example.Personal_Finance_Management.entity.Expence;
import com.example.Personal_Finance_Management.entity.Income;
import com.example.Personal_Finance_Management.entity.Investment;
import com.example.Personal_Finance_Management.entity.Savings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ReportsService {
    @Autowired
    private IncomeRepo incomeRepo;
    @Autowired
    private SavingsRepo savingsRepo;
    @Autowired
    private ExpenceRepo expenceRepo;
    @Autowired
    private InvestmentRepo investmentRepo;
    public BigDecimal getTotalIncome() {
        List<Income> allIncomes = incomeRepo.findAll();
        return allIncomes.stream().map(Income::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    public BigDecimal getTotalExpenses() {
        List<Expence> allExpenses = expenceRepo.findAll();
        return allExpenses.stream().map(Expence::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    public BigDecimal getTotalInvestments() {
        List<Investment> allInvestments = investmentRepo.findAll();
        return allInvestments.stream().map(Investment::getAmountInvested).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    public BigDecimal getTotalSavings() {
        List<Savings> allInvestments = savingsRepo.findAll();
        return allInvestments.stream().map(Savings::getAmountSaved).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public List<ExpenceCategorySummary> getExpenseCategorySummary() {
        return expenceRepo.getCategorySummary();
    }
}
