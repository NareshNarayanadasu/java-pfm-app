package com.example.Personal_Finance_Management.dto;

import com.example.Personal_Finance_Management.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomeRequest {
    private String category;
    private BigDecimal amount;
    private LocalDate date;
    private String accountNumber;




}
