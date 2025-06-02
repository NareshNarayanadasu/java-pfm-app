package com.example.Personal_Finance_Management.util;

public class MaskingUtil {
    public static String maskAccountNumber(Long accountNumber) {
        if (accountNumber == null) {
            return null;
        }
        String accountStr = accountNumber.toString();
        if (accountStr.length() <= 2) {
            return accountStr;
        }
        String maskedPart = "*".repeat(accountStr.length() - 2);
        String visiblePart = accountStr.substring(accountStr.length() - 2);
        return maskedPart + visiblePart;
    }
}
