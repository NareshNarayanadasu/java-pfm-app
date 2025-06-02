package com.example.Personal_Finance_Management.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Savings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private BigDecimal amountSaved;
    private BigDecimal goalAmount;
    private String setGoalName;
    private BigDecimal progress;

    public void addAmountSaved(BigDecimal amountToAdd) {
        if (this.amountSaved == null) {
            this.amountSaved = BigDecimal.ZERO;
        }
        this.amountSaved = this.amountSaved.add(amountToAdd);
        updateProgress();
    }
    public void setGoalAmount(BigDecimal goalAmount) {
        this.goalAmount = goalAmount;
        updateProgress();  // Update progress when goal amount is set or modified
    }
    public void updateProgress() {
        if (goalAmount != null && goalAmount.compareTo(BigDecimal.ZERO) > 0) {
            this.progress = amountSaved.divide(goalAmount, 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
        } else {
            this.progress = BigDecimal.ZERO;
        }
    }
}
