package com.example.Personal_Finance_Management.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Entity
@Data
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal amountInvested;
    private BigDecimal currentValue;
    private LocalDate dateOfInvestment;

    public BigDecimal getPerformance(){
        if(amountInvested.compareTo(BigDecimal.ZERO)==0){
            return BigDecimal.ZERO;
        }
        return currentValue.subtract(amountInvested).divide(amountInvested,4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
    }
}
