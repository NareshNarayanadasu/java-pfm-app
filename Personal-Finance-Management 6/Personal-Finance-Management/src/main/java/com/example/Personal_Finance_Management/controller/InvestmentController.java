package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.dto.CurrentValueDTO;
import com.example.Personal_Finance_Management.entity.Investment;
import com.example.Personal_Finance_Management.service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/investment")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;


    @GetMapping
    public List<Investment> getAllInvestments() {
        List<Investment> list = investmentService.getALlInvestments();
        return list;
    }

    @PostMapping("/investment")
    public ResponseEntity<Investment> postInvestment(@RequestBody Investment investment) {
        Investment savedInvestment = investmentService.saveInvestment(investment);
        return ResponseEntity.ok(savedInvestment);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvestment(@PathVariable Long id) {
        investmentService.deleteInvestment(id);
        return ResponseEntity.noContent().build();
    }

}
