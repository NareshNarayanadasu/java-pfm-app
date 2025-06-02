package com.example.Personal_Finance_Management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BudgetRequest {
    private BigDecimal actualAmountSpent=BigDecimal.ZERO;
    private String category;
}
