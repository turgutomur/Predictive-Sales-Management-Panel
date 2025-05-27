package com.salesforecast.salespanel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salesforecast.salespanel.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUserId(Long userId);
}

