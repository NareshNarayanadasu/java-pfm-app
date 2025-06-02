package com.example.Personal_Finance_Management.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountCreateRequest {
//    @NotNull(message = "Account number must not be null")
//    @Digits(integer = 11, fraction = 0, message = "Account number must be a valid 10-digit number")
    private String  accountNumber;
//    @Size
//    @NotNull(message = "Account name must not be null")
    private String account_holder_name;
//    @NotNull(message = "Account name must not be null")
//    @Size(min = 3, max = 100, message = "Account name must be between 3 and 100 characters")
    private String accountType;
//    @NotNull(message = "Initial balance must not be null")
//    @DecimalMin(value = "0.00", inclusive = false, message = "Initial balance must be greater than zero")
    private BigDecimal initialBalance;

}
