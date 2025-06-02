package com.example.Personal_Finance_Management.controller;


import com.example.Personal_Finance_Management.entity.Expence;
import com.example.Personal_Finance_Management.service.ExpenceService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/expence")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ExpenceController {
    @Autowired
    private ExpenceService expenceService;

    @PostMapping("/expense")
    public ResponseEntity<Expence> postExpense(@RequestBody Expence expense) {
        expenceService.saveExpense(expense);
        return ResponseEntity.ok(expense);
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllExpence() {
        try {
            return ResponseEntity.ok(expenceService.getAllExpence());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong while fetching all expenses");
        }
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<?> updateExpence(@PathVariable Long id, @RequestBody Expence expence) {
        try {
            return ResponseEntity.ok(expenceService.updateExpence(id, expence));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong while updating expence");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExpenceById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(expenceService.getByIdExpence(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong while fetching expence");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpence(@PathVariable Long id) {
        try {
            expenceService.deleteExpence(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong while deleting expence");
        }
    }
}

