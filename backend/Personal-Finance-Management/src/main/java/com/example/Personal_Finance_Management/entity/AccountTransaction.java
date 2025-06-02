package com.example.Personal_Finance_Management.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "from_account_number")
    @JsonBackReference
    private Account fromAccount;

    @ManyToOne
    @JoinColumn(name = "to_account_number")
    @JsonBackReference
    private Account toAccount;

    @Column(nullable = false)
    private BigDecimal amount;
    private String description;
    private LocalDateTime transactionDate = LocalDateTime.now();

}
