package com.example.Personal_Finance_Management.ExpenceRepository;

import com.example.Personal_Finance_Management.dto.ExpenceCategorySummary;
import com.example.Personal_Finance_Management.entity.Expence;
import com.example.Personal_Finance_Management.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenceRepo extends JpaRepository<Expence,Long> {


    @Query("SELECT new com.example.Personal_Finance_Management.dto.ExpenceCategorySummary(e.category, SUM(e.amount)) " +
            "FROM Expence e GROUP BY e.category")
    List<ExpenceCategorySummary> getCategorySummary();

}
