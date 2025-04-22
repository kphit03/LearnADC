package com.learnadc.repositories;

import com.learnadc.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Long> {
//    Optional<ApplicationUser> findByUsername(String username);
    //check if user exists
    boolean existsByUsername(String username);

    Optional<ApplicationUser> findByEmailOrUsername(String email, String username);
    //check if email is registered and allows us to fetch a user by email for login
    boolean existsByEmail(String email);
}
