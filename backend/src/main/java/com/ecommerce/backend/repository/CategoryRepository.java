package com.ecommerce.backend.repository;

import com.ecommerce.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category , UUID> {

}
