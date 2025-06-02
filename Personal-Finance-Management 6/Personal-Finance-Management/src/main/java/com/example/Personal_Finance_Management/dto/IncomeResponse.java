package com.example.Personal_Finance_Management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomeResponse {
    private Long id;
    private String category;
    private BigDecimal amount;
    private LocalDate date;
    private String accountNumber;
}
