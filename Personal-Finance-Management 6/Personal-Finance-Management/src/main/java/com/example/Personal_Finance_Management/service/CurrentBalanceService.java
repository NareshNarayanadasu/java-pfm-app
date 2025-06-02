package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.CurrentBalanceRepo;
import com.example.Personal_Finance_Management.entity.CurrentBalance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class CurrentBalanceService {
    @Autowired
    private CurrentBalanceRepo currentBalanceRepository;
    public BigDecimal getCurrentBalance() {
        List<CurrentBalance> balanceList = currentBalanceRepository.findAll();
        if (balanceList.isEmpty()) {
            return BigDecimal.ZERO; // If no record exists, return 0 balance
        }

        return balanceList.get(0).getCurrentBalance();
    }
}
