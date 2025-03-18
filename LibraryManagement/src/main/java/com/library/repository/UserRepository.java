package com.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.model.Users;

public interface UserRepository extends JpaRepository<Users, Long>{

	Users findByEmail(String username);

}
