package com.library.controller;

import com.library.model.Book;
import com.library.service.BookService;
import com.library.config.JwtProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final JwtProvider jwtProvider;

    public BookController(BookService bookService, JwtProvider jwtProvider) {
        this.bookService = bookService;
        this.jwtProvider = jwtProvider;
    }

    // Add a new book
    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestHeader("Authorization") String token, @RequestBody Book book) {
        
        // Extract email from token
        String email = jwtProvider.getEmailFromToken(token);

        Book newBook = bookService.addBook(email, book);

        return ResponseEntity.ok(newBook);
    }

    // Edit an existing book
    @PutMapping("/edit/{bookId}")
    public ResponseEntity<?> editBook(@RequestHeader("Authorization") String token, 
                                      @PathVariable String bookId, 
                                      @RequestBody Book updatedBook) { 

        // Extract email from token
        String email = jwtProvider.getEmailFromToken(token);

        Book book = bookService.editBook(email, bookId, updatedBook);

        return ResponseEntity.ok(book);
    }
}
