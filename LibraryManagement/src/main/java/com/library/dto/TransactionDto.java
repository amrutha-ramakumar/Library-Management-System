package com.library.dto;

import java.time.LocalDateTime;

import com.library.enums.TransactionStatus;
import com.library.model.Book;
import com.library.model.Users;


import lombok.Data;

@Data
public class TransactionDto {
	private String id;

   
    private Users user;

    private Book book;

    private LocalDateTime borrowDate;
    private LocalDateTime returnDate;

 
    private String status;
}
