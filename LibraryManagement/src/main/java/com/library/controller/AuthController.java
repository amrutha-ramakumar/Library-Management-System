package com.library.controller;

import com.library.dto.LoginDTO;
import com.library.dto.RegisterDTO;
import com.library.model.Users;
import com.library.service.UserService;
import com.library.config.JwtProvider;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
   

    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
       
    }

    @PostMapping("/register")
    public Users registerUser(@RequestBody RegisterDTO registerDTO) {
        return userService.registerUser(registerDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        
        
        return userService.loginUser(loginDTO);
    }
}
