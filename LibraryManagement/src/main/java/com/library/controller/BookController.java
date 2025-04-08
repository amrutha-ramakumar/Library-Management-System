package com.library.controller;

import com.library.model.Book;
import com.library.service.BookService;
import com.library.config.JwtProvider;
import com.library.dto.BookDTO;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> addBook(@RequestHeader("Authorization") String token, @RequestBody BookDTO book) {
        
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
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@RequestHeader("Authorization") String token,@PathVariable String id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/list")
    public ResponseEntity<List<Book>> listBooks(@RequestHeader("Authorization") String token) {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }
    
}
