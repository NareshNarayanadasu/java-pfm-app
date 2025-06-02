package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.IncomeRepo;
import com.example.Personal_Finance_Management.entity.Income;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncomeService {
    @Autowired
    private IncomeRepo incomeRepo;
    @Autowired
    private com.example.Personal_Finance_Management.ExpenceRepository.CurrentBalanceRepo CurrentBalanceRepo;



    public Income getIncomeById(Long id) {
        Optional<Income> optional = incomeRepo.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new EntityNotFoundException("Income entity not found for ID: " + id);
        }
    }


    public List<Income> getAllIncome() {
        return incomeRepo.findAll();
    }



    public Income updateIncome(Long id, Income income) {
        Optional<Income> optionalIncome = incomeRepo.findById(id);
        if (optionalIncome.isPresent()) {
            Income existingIncome = optionalIncome.get();
            // Update fields
            existingIncome.setAmount(income.getAmount());
            existingIncome.setDate(income.getDate());
            existingIncome.setCategory(income.getCategory());
            return incomeRepo.save(existingIncome);
        } else {
            throw new EntityNotFoundException("Income entity not found for ID: " + id);
        }
    }

}
