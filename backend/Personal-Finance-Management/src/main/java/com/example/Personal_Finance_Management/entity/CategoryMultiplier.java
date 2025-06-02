package com.example.Personal_Finance_Management.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
public class CategoryMultiplier {
    @Id
    private String category;  // Category name (e.g., "STOCK", "BOND", etc.)
    private BigDecimal multiplier;
}
