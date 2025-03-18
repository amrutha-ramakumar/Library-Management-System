package com.library.service;

import com.library.enums.TransactionStatus;
import com.library.model.Transaction;
import com.library.model.Users;
import com.library.repository.TransactionRepository;
import com.library.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminTransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public AdminTransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    // Get users who have borrowed books
    public List<Users> getUsersWhoBorrowedBooks() {
        List<Transaction> borrowedTransactions = transactionRepository.findByStatus(TransactionStatus.BORROWED);
        return borrowedTransactions.stream()
                .map(Transaction::getUser)
                .distinct()
                .collect(Collectors.toList());
    }

    // Get users who have returned books
    public List<Users> getUsersWhoReturnedBooks() {
        List<Transaction> returnedTransactions = transactionRepository.findByStatus(TransactionStatus.RETURNED);
        return returnedTransactions.stream()
                .map(Transaction::getUser)
                .distinct()
                .collect(Collectors.toList());
    }

    // Get all transactions for a specific user
    public List<Transaction> getUserTransactions(String email) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found!");
        }
        return transactionRepository.findByUser(user);
    }
}
