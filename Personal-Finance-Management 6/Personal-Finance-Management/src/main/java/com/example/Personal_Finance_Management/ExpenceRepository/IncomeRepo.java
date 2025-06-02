package com.example.Personal_Finance_Management.ExpenceRepository;

import com.example.Personal_Finance_Management.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepo extends JpaRepository<Income,Long> {


    Income findByAmountFromAccount(String s);
}
