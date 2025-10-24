package com.ecommerce.backend.auth.repositories;

import com.ecommerce.backend.auth.entities.User;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDetailRepository extends JpaRepository<User, UUID> { //change to long
    User findByEmail(String username);
}
