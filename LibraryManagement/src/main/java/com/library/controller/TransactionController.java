package com.library.controller;

import com.library.model.*;
import com.library.service.TransactionService;
import com.library.config.JwtProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final JwtProvider jwtProvider;

    public TransactionController(TransactionService transactionService, JwtProvider jwtProvider) {
        this.transactionService = transactionService;
        this.jwtProvider = jwtProvider;
    }

    // Borrow a book
    @PostMapping("/borrow/{bookId}")
    public ResponseEntity<?> borrowBook(@RequestHeader("Authorization") String token, @PathVariable String bookId) {
        
        String email = jwtProvider.getEmailFromToken(token);

        Transaction transaction = transactionService.borrowBook(email, bookId);
        return ResponseEntity.ok(transaction);
    }

    // Return a borrowed book
    @PostMapping("/return/{transactionId}")
    public ResponseEntity<?> returnBook(@RequestHeader("Authorization") String token, @PathVariable String transactionId) {
    	String email = jwtProvider.getEmailFromToken(token);

        Transaction transaction = transactionService.returnBook(email, transactionId);
        return ResponseEntity.ok(transaction);
    }

    // Get user's borrowed books
    @GetMapping("/my-books")
    public ResponseEntity<List<Transaction>> getMyBorrowedBooks(@RequestHeader("Authorization") String token) {
    	String email = jwtProvider.getEmailFromToken(token);

        List<Transaction> transactions = transactionService.getUserBorrowedBooks(email);
        return ResponseEntity.ok(transactions);
    }
}
