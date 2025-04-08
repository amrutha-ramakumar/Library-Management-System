package com.library.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.library.config.JwtProvider;
import com.library.dto.UserDto;
import com.library.model.Users;
import com.library.service.UserService;

@RestController
@RequestMapping("/api/profile")
public class UserController {
	 private final UserService userService;
	    private final JwtProvider jwtProvider;

	    public UserController(UserService userService, JwtProvider jwtProvider) {
	        this.userService = userService;
	        this.jwtProvider = jwtProvider;
	    }
	    @GetMapping("/details")
	    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
	        String email = jwtProvider.getEmailFromToken(token);

	        Users user = userService.getUserDetailsFromToken(email);
	        if (user == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }

	        return ResponseEntity.ok(user);
	    }
	@PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String token, @RequestBody UserDto updatedUser) {
        // Extract JWT token from "Bearer <token>"

        // Extract email from JWT token
        String email = jwtProvider.getEmailFromToken(token);

        Users user = userService.updateUser(email, updatedUser);

        return ResponseEntity.ok(Map.of(
                "message", "User updated successfully",
                "name", user.getName(),
                "phone", user.getPhone()
        ));
    }
	
	@GetMapping("/role")
    public ResponseEntity<Page<Users>> getUsersByRole(@RequestHeader("Authorization") String token,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Users> users = userService.findByRole(pageable);
        return ResponseEntity.ok(users);
    }
}
