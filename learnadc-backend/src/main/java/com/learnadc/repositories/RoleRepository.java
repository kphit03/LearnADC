package com.learnadc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnadc.model.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    //get our roles like ROLE_USER and ROLE_ADMIN, used when registering users
    Optional<Role> findByAuthority(String authority);
}
