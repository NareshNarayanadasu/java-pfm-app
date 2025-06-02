package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.*;
import com.example.Personal_Finance_Management.dto.*;
import com.example.Personal_Finance_Management.entity.*;
import com.example.Personal_Finance_Management.util.MaskingUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountService {
    @Autowired
    private CurrentBalanceRepo currentBalanceRepo;
    @Autowired
    private IncomeRepo incomeRepo;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountTransactionRepository transactionRepository;
    @Autowired
    private TransactionRepo transactionRepo;
    public Account createAccountAndUpdateIncome(AccountCreateRequest request) {
        Optional<Account> existingAccount = accountRepository.findById(request.getAccountNumber());

        if (existingAccount.isPresent()) {
            Account account = existingAccount.get();
            BigDecimal updatedBalance = account.getBalance().add(request.getInitialBalance());
            account.setBalance(updatedBalance);

            return accountRepository.save(account);
        } else {

            Account account = new Account();
            account.setAccountNumber(request.getAccountNumber());
            account.setAccount_holder_name(request.getAccount_holder_name());
            account.setAccountType(request.getAccountType());
            account.setBalance(request.getInitialBalance());


            return accountRepository.save(account);
        }
    }


    public IncomeResponse addAccountBalanceToIncome(IncomeRequest request) {

        Account account = accountRepository.findById(request.getAccountNumber())
                .orElseThrow(() -> new IllegalArgumentException("Account not found with number: " +request.getAccountNumber()));

        BigDecimal incomeAmount = request.getAmount();

        // Check if the account has enough balance
        if (account.getBalance().compareTo(incomeAmount) < 0) {
            throw new IllegalArgumentException("Insufficient balance in the account");
        }

        // Update the account balance after the income
        account.setBalance(account.getBalance().subtract(incomeAmount));
        accountRepository.save(account);

        // Create and populate the Income entity
        Income income = new Income();
        income.setCategory(request.getCategory());
        income.setAccount(account);  // Set the actual Account entity
        income.setDate(request.getDate() != null ? request.getDate() : LocalDate.now());
        income.setAmount(incomeAmount);

        // Update the current balance (if applicable)
        updateCurrentBalanceForIncome(incomeAmount);
        recordTransaction(request.getAmount(),"income",request.getCategory());
        // Save the Income entity to the repository
        incomeRepo.save(income);

        // Return the IncomeResponse DTO
        IncomeResponse response = new IncomeResponse();
        response.setId(income.getId());
        response.setCategory(income.getCategory());
        response.setDate(income.getDate());
        response.setAmount(income.getAmount());
        response.setAccountNumber(MaskingUtil.maskAccountNumber(Long.valueOf(account.getAccountNumber())));

        return response;
    }


    private void updateCurrentBalanceForIncome(BigDecimal incomeAmount) {
        // Fetch the current balance (you can adjust this based on your logic)
        CurrentBalance currentBalance = currentBalanceRepo.findById(1L)
                .orElseGet(() -> {
                    // If not found, create a new CurrentBalance with a balance of 0
                    CurrentBalance newBalance = new CurrentBalance();
                    newBalance.setId(1L);  // Set the ID, assuming you want to initialize it with ID 1
                    newBalance.setCurrentBalance(BigDecimal.ZERO);  // Set initial balance to 0
                    currentBalanceRepo.save(newBalance);  // Save the new object to the repo
                    return newBalance;  // Return the new balance object
                });
        if (currentBalance.getCurrentBalance() == null) {
            currentBalance.setCurrentBalance(BigDecimal.ZERO);  // Safeguard against null
        }
        BigDecimal newBalance = currentBalance.getCurrentBalance().add(incomeAmount);
        currentBalance.setCurrentBalance(newBalance);
        currentBalanceRepo.save(currentBalance);
    }

    private void recordTransaction(BigDecimal amount, String type, String category) {
        // Create and record a new transaction
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setType(type);
        transaction.setCategory(category);
        transaction.setDate(LocalDate.now());
        transactionRepo.save(transaction);
    }

    @Transactional
    public void transferFunds(TransferRequest transferRequest) {
        Account fromAccount = accountRepository.findById(transferRequest.getFromAccountNumber())
                .orElseThrow(() -> new IllegalArgumentException("From account not found"));
        Account toAccount = accountRepository.findById(transferRequest.getToAccountNumber())
                .orElseThrow(() -> new IllegalArgumentException("To account not found"));

        if (fromAccount.getBalance().compareTo(transferRequest.getAmount()) < 0) {
            throw new IllegalArgumentException("Insufficient balance in the from account");
        }

        fromAccount.setBalance(fromAccount.getBalance().subtract(transferRequest.getAmount()));
        toAccount.setBalance(toAccount.getBalance().add(transferRequest.getAmount()));

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        AccountTransaction transaction = new AccountTransaction();
        transaction.setFromAccount(fromAccount);
        transaction.setToAccount(toAccount);
        transaction.setAmount(transferRequest.getAmount());
       // transaction.setDescription(transferRequest.getDescription());
        transactionRepository.save(transaction);


    }

    public AccountResponse getAccountByAccountNumber(String accountNumber) {
        Account account = accountRepository.findById(accountNumber)
                .orElseThrow(() -> new IllegalStateException("Account not found"));

        AccountResponse response = new AccountResponse();
        response.setAccountNumber(MaskingUtil.maskAccountNumber(Long.valueOf(account.getAccountNumber())));
        response.setAccount_holder_name(account.getAccount_holder_name());
        response.setAccountType(account.getAccountType());
        response.setBalance(account.getBalance());
        response.setOutgoingTransactions(
                account.getOutgoingTransactions().stream()
                        .map(this::convertToTransactionResponse)
                        .collect(Collectors.toList())
        );
        response.setIncomingTransactions(
                account.getIncomingTransactions().stream()
                        .map(this::convertToTransactionResponse)
                        .collect(Collectors.toList())
        );

        return response;
    }

    private TransactionResponse convertToTransactionResponse(AccountTransaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setAmount(transaction.getAmount());
        response.setDescription(transaction.getDescription());
        response.setTransactionDate(transaction.getTransactionDate());
        return response;
    }
}

