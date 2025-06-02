package com.example.Personal_Finance_Management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferRequest {
    private String  fromAccountNumber;
    private String  toAccountNumber;
    private BigDecimal amount;
//    private String description;
}
