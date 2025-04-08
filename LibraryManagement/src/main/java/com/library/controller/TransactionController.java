package com.library.controller;

import com.library.model.*;
import com.library.service.TransactionService;
import com.library.config.JwtProvider;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
//    @PostMapping("/borrow/{bookId}")
//    public ResponseEntity<?> borrowBook(@RequestHeader("Authorization") String token, @PathVariable String bookId) {
//        
//        String email = jwtProvider.getEmailFromToken(token);
//
//        Transaction transaction = transactionService.borrowBook(email, bookId);
//        return ResponseEntity.ok(transaction);
//    }
    @PostMapping("/borrow/{bookId}")
    public ResponseEntity<?> borrowBook(@RequestHeader("Authorization") String token, @PathVariable String bookId) {
        try {
            String email = jwtProvider.getEmailFromToken(token);
            Transaction transaction = transactionService.borrowBook(email, bookId);
            return ResponseEntity.ok(transaction);

        } catch (RuntimeException ex) {
            // Send proper error message to frontend
            Map<String, String> error = new HashMap<>();
            error.put("message", ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception ex) {
            // For unexpected errors
            Map<String, String> error = new HashMap<>();
            error.put("message", "Something went wrong. Please try again later.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
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
    
    @GetMapping("/available-books")
    public ResponseEntity<List<Book>> getAvailableBooks() {
        List<Book> availableBooks = transactionService.getAvailableBooks();
        return ResponseEntity.ok(availableBooks);
    }
    

    @GetMapping("/all")
    public ResponseEntity<Page<Transaction>> getAllTransactions(@RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Transaction> transactions = transactionService.getAllTransactions(page, size);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Transaction>> searchTransactions(@RequestHeader("Authorization") String token,
            @RequestParam String bookTitle,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Transaction> transactions = transactionService.searchTransactions(bookTitle, page, size);
        return ResponseEntity.ok(transactions);
    }
}
