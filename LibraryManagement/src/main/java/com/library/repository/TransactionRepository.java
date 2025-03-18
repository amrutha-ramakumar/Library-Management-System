package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.enums.TransactionStatus;
import com.library.model.Transaction;
import com.library.model.Users;

public interface TransactionRepository extends JpaRepository<Transaction, String>{

	List<Transaction> findByUserAndStatus(Users user, TransactionStatus borrowed);

	long countByUserAndStatus(Users user, TransactionStatus borrowed);

	List<Transaction> findByStatus(TransactionStatus borrowed);

	List<Transaction> findByUser(Users user);

}
