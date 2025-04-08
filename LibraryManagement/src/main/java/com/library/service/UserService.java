package com.library.service;


import com.library.config.CustomUserServiceImplementation;
import com.library.config.JwtProvider;
import com.library.dto.LoginDTO;
import com.library.dto.RegisterDTO;
import com.library.dto.UserDto;
import com.library.model.Users;
import com.library.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final CustomUserServiceImplementation customUserService;
	private final JwtProvider jwtProvider;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			CustomUserServiceImplementation customUserService, JwtProvider jwtProvider) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.customUserService = customUserService;
		this.jwtProvider = jwtProvider;
	}

	public Users registerUser(RegisterDTO registerDTO) {
		Users user = new Users();
		user.setEmail(registerDTO.getEmail());
		user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
		user.setRole(registerDTO.getRole());
		user.setName(registerDTO.getName());
		user.setPhone(registerDTO.getPhone());
		return userRepository.save(user);
	}

	public ResponseEntity<?> loginUser(LoginDTO loginDTO) {
		Authentication authentication = authenticate(loginDTO.getEmail(), loginDTO.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		// Fetch user details
		Users user = userRepository.findByEmail(loginDTO.getEmail());

		if (user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
		}

		// Generate JWT token
		String token = jwtProvider.generateToken(authentication);

		// Return response with token and role
		return ResponseEntity
				.ok(Map.of("token", token, "role", user.getRole(), "email", user.getEmail(), "name", user.getName()));
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserService.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username...");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password...");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	public Users updateUser(String email, UserDto updatedUser) {
	    Users user = userRepository.findByEmail(email);

	    if (user == null) {
	        throw new RuntimeException("User not found");
	    }

	    if (updatedUser.getName() != null) {
	        user.setName(updatedUser.getName());
	    }
	    
	    if (updatedUser.getPhone() != null) {
	        user.setPhone(updatedUser.getPhone());
	    }
	    user.setEmail(user.getEmail());
	    user.setPassword(user.getPassword());
	    user.setRole(user.getRole());
	   

	    return userRepository.save(user);
	}


	public Users getUserDetailsFromToken(String email) {
     

        return userRepository.findByEmail(email);
    }


	public Page<Users> findByRole(Pageable pageable) {
		
		return userRepository.findByRole("USER", pageable);
	}
}
