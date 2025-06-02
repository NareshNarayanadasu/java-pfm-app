package com.example.Personal_Finance_Management.ExpenceRepository;

import com.example.Personal_Finance_Management.entity.Budget;
//import com.example.Personal_Finance_Management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepo extends JpaRepository<Budget,Long> {
    Optional<Budget> findByCategory(String category);
}
