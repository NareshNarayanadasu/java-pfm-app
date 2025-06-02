package com.example.Personal_Finance_Management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavingsRequest {
    private String category;
    private BigDecimal amountSaved;
    private BigDecimal goalAmount;
    private String setGoalName;
}
