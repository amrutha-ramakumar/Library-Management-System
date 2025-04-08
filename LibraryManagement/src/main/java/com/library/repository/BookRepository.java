package com.library.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.model.Book;

public interface BookRepository extends JpaRepository<Book, String> {

	Optional<Book> findById(String id);

	boolean existsByTitle(String title);


}
