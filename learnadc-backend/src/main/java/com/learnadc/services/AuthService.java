package com.learnadc.services;

import com.learnadc.dto.LoginRequest;
import com.learnadc.dto.LoginResponse;
import com.learnadc.dto.RegisterRequest;
import com.learnadc.model.ApplicationUser;
import com.learnadc.model.Role;
import com.learnadc.repositories.RoleRepository;
import com.learnadc.repositories.UserRepository;
import com.learnadc.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTGenerator jwtGenerator;

    //dependency injection

    @Autowired
    public AuthService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTGenerator jwtGenerator) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }

    //register method, used in our controller later
    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) { //check if email exists when the request is passed
            return "Email Already Exists";
        }

        Optional<Role> userRoleOutput = roleRepository.findByAuthority("ROLE_USER");
        if (userRoleOutput.isEmpty()) {
            return "Default role not found. Please insert ROLE_USER into database";
        }

        Role userRole = userRoleOutput.get();

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);

        ApplicationUser newUser = new ApplicationUser ( //create our new ApplicationUser object from ApplicationUser constructor
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                roles
        );

        userRepository.save(newUser);
        return "User successfully registered";
    }

    public LoginResponse login(LoginRequest request) {
        try {
            //verifies email/password against the database
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            String token = jwtGenerator.generateToken(request.getEmail()); //if auth successful, generate token
            return new LoginResponse(token); //return token to the frontend
        } catch (AuthenticationException e) {
            throw new RuntimeException("Authentication failed, invalid credentials");
        }
    }
}
