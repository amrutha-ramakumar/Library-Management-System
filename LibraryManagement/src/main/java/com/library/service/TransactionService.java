package com.library.service;

import com.library.enums.TransactionStatus;
import com.library.model.*;
import com.library.repository.BookRepository;
import com.library.repository.TransactionRepository;
import com.library.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    private static final int MAX_BORROW_LIMIT = 3; // Max books a user can borrow

    public TransactionService(TransactionRepository transactionRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    // Borrow a book
    public Transaction borrowBook(String email, String bookId) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found!");
        }

        long borrowedCount = transactionRepository.countByUserAndStatus(user, TransactionStatus.BORROWED);
        if (borrowedCount >= MAX_BORROW_LIMIT) {
            throw new RuntimeException("Borrowing limit reached! You can only borrow " + MAX_BORROW_LIMIT + " books.");
        }

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found!"));

        if (book.getAvailable() <= 0) {
            throw new RuntimeException("No copies available for this book!");
        }

        book.setAvailable(book.getAvailable() - 1);
        bookRepository.save(book);

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setBook(book);
        transaction.setBorrowDate(LocalDateTime.now());
        transaction.setStatus(TransactionStatus.BORROWED);

        return transactionRepository.save(transaction);
    }

    // Return a borrowed book
    public Transaction returnBook(String email, String transactionId) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found!");
        }

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found!"));

        if (!transaction.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized action! You can only return your own borrowed books.");
        }

        transaction.setReturnDate(LocalDateTime.now());
        transaction.setStatus(TransactionStatus.RETURNED);

        Book book = transaction.getBook();
        book.setAvailable(book.getAvailable() + 1);
        bookRepository.save(book);

        return transactionRepository.save(transaction);
    }

    // Get all borrowed books for a user
    public List<Transaction> getUserBorrowedBooks(String email) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found!");
        }

        return transactionRepository.findByUserAndStatus(user, TransactionStatus.BORROWED);
    }
}
