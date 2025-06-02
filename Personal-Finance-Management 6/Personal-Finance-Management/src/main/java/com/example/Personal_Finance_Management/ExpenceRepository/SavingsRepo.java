package com.example.Personal_Finance_Management.ExpenceRepository;

import com.example.Personal_Finance_Management.entity.Savings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavingsRepo extends JpaRepository<Savings,Long> {

    List<Savings> findByCategory(String category);
}
