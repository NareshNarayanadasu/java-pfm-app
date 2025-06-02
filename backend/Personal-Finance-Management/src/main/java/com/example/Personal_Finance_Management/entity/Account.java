package com.example.Personal_Finance_Management.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Account {
    @Id
    private String accountNumber;
    private String account_holder_name;

    private String accountType;

    private BigDecimal balance = BigDecimal.ZERO;

    // @OneToMany(mappedBy = "fromAccount", cascade = CascadeType.ALL)

    @OneToMany(mappedBy = "fromAccount", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<AccountTransaction> outgoingTransactions=new ArrayList<>();

    // @OneToMany(mappedBy = "toAccount", cascade = CascadeType.ALL)
    @OneToMany(mappedBy = "toAccount", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<AccountTransaction> incomingTransactions=new ArrayList<>();
}
