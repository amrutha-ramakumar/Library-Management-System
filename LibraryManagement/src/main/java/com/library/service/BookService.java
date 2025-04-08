package com.library.service;

import com.library.dto.BookDTO;
import com.library.enums.TransactionStatus;
import com.library.model.Book;
import com.library.model.Users;
import com.library.repository.BookRepository;
import com.library.repository.TransactionRepository;
import com.library.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    public BookService(BookRepository bookRepository, UserRepository userRepository,TransactionRepository transactionRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.transactionRepository=transactionRepository;
    }

    public Book addBook(String email, BookDTO bookDTO) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found!");
        }
        if (bookRepository.existsByTitle(bookDTO.getTitle())) {
            throw new RuntimeException("A book with the same title already exists!");
        }
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setIsbn(bookDTO.getIsbn());
        book.setQuantity(bookDTO.getQuantity());
        book.setAvailable(bookDTO.getQuantity());
        return bookRepository.save(book);
    }

//    public Book editBook(String email, String bookId, Book updatedBook) {
//        Users user = userRepository.findByEmail(email);
//        if (user == null) {
//            throw new RuntimeException("User not found!");
//        }
//        if (bookRepository.existsByTitle(updatedBook.getTitle())) {
//            throw new RuntimeException("A book with the same title already exists!");
//        }
//
//        Book book = bookRepository.findById(bookId)
//                .orElseThrow(() -> new RuntimeException("Book not found!"));
//
//        book.setTitle(updatedBook.getTitle());
//        book.setAuthor(updatedBook.getAuthor());
//        book.setIsbn(updatedBook.getIsbn());
//        book.setQuantity(updatedBook.getQuantity());
//        book.setAvailable(updatedBook.getAvailable());
//
//        return bookRepository.save(book);
//    }

    public Book editBook(String email, String bookId, Book updatedBook) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found!");
        }

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found!"));

        // Check if new title already exists for a different book
//        if (!book.getTitle().equals(updatedBook.getTitle()) &&
//                bookRepository.existsByTitle(updatedBook.getTitle())) {
//            throw new RuntimeException("A book with the same title already exists!");
//        }

        // Update book fields
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setIsbn(updatedBook.getIsbn());
        book.setQuantity(updatedBook.getQuantity());

        // Count BORROWED transactions for this book
        int borrowedCount = transactionRepository.countByBookAndStatus(book, TransactionStatus.BORROWED);

        // Calculate available books
        int availableCount = updatedBook.getQuantity() - borrowedCount;
        book.setAvailable(Math.max(availableCount, 0)); 

        return bookRepository.save(book);
    }
 
	public List<Book> getAllBooks() {
		
		return bookRepository.findAll();
	}

	 public Optional<Book> getBookById(String id) {
	        return bookRepository.findById(id);
	    }

}
