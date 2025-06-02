package com.example.Personal_Finance_Management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal amount;
    private LocalDate date;
    private String category;
    private String type;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

}
