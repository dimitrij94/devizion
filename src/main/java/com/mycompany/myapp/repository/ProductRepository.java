package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
public interface ProductRepository extends JpaRepository<Product, Long> {
    Set<Product> findByProductCategoryId(Long id);

    Page<Product> findByProductCategoryId(Long categoryId, Pageable pageRequest);
}
