package com.library.controller;

import com.library.model.Transaction;
import com.library.model.Users;
import com.library.service.AdminTransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/transactions")
public class AdminTransactionController {

    private final AdminTransactionService adminTransactionService;

    public AdminTransactionController(AdminTransactionService adminTransactionService) {
        this.adminTransactionService = adminTransactionService;
    }

    // Get all users who borrowed books
    @GetMapping("/borrowed")
    public ResponseEntity<List<Users>> getUsersWhoBorrowedBooks() {
        return ResponseEntity.ok(adminTransactionService.getUsersWhoBorrowedBooks());
    }

    // Get all users who returned books
    @GetMapping("/returned")
    public ResponseEntity<List<Users>> getUsersWhoReturnedBooks() {
        return ResponseEntity.ok(adminTransactionService.getUsersWhoReturnedBooks());
    }

    // Get all transactions of a user by email
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable String email) {
        return ResponseEntity.ok(adminTransactionService.getUserTransactions(email));
    }
}
