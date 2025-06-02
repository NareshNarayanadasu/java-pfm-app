package com.example.Personal_Finance_Management.ExpenceRepository;

import com.example.Personal_Finance_Management.entity.CurrentBalance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrentBalanceRepo extends JpaRepository<CurrentBalance,Long> {
}
