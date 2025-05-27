package com.salesforecast.salespanel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salesforecast.salespanel.model.SalesData;

import java.time.LocalDate;
import java.util.List;

public interface SalesDataRepository extends JpaRepository<SalesData, Long> {

    // Belirli bir ürüne ait tüm satış kayıtlarını getir
    List<SalesData> findByProductId(Long productId);

    // Belirli tarih aralığındaki satışları getir
    List<SalesData> findBySaleDateBetween(LocalDate startDate, LocalDate endDate);

    // Belirli bir ürünün, belirli tarih aralığındaki satışlarını getir
    List<SalesData> findByProductIdAndSaleDateBetween(Long productId, LocalDate startDate, LocalDate endDate);
}
