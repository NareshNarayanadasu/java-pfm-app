package com.example.Personal_Finance_Management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private BigDecimal amount;
    private BigDecimal actualAmountSpent=BigDecimal.ZERO;
    private LocalDate startdate;
    private LocalDate endDate;
    private BigDecimal alertThreshold=BigDecimal.valueOf(0.9);


    public boolean isOverSpending() {
        BigDecimal thresholdAmount = amount.multiply(alertThreshold);
        return actualAmountSpent.compareTo(thresholdAmount) > 0;
    }
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

}
