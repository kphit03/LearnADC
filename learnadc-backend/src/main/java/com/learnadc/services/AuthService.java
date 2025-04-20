package com.learnadc.services;

import com.learnadc.dto.RegisterRequest;
import com.learnadc.model.ApplicationUser;
import com.learnadc.model.Role;
import com.learnadc.repositories.RoleRepository;
import com.learnadc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    //dependency injection
    @Autowired
    public AuthService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //register method
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
}
