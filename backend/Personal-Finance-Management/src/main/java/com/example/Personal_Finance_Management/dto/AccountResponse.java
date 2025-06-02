package com.example.Personal_Finance_Management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
    private String accountType;
    private String account_holder_name;
    private String accountNumber;
    private BigDecimal balance;
    private List<TransactionResponse> outgoingTransactions;
    private List<TransactionResponse> incomingTransactions;



    public void setOutgoingTransactions(List<TransactionResponse> outgoingTransactions) {
        this.outgoingTransactions = outgoingTransactions;
    }



    public void setIncomingTransactions(List<TransactionResponse> incomingTransactions) {
        this.incomingTransactions = incomingTransactions;
    }
}