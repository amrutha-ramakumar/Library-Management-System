package com.library.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.config.JwtProvider;
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
	@PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String token, @RequestBody Users updatedUser) {
        // Extract JWT token from "Bearer <token>"
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;

        // Extract email from JWT token
        String email = jwtProvider.getEmailFromToken(jwt);

        Users user = userService.updateUser(email, updatedUser);

        return ResponseEntity.ok(Map.of(
                "message", "User updated successfully",
                "name", user.getName(),
                "phone", user.getPhone()
        ));
    }
}
