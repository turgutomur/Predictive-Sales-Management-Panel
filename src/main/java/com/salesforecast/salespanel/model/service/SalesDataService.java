package com.salesforecast.salespanel.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salesforecast.salespanel.model.SalesData;
import com.salesforecast.salespanel.repository.SalesDataRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class SalesDataService {

    @Autowired
    private SalesDataRepository salesDataRepository;

    public SalesData saveSalesData(SalesData data) {
        return salesDataRepository.save(data);
    }

    public List<SalesData> getAllSales() {
        return salesDataRepository.findAll();
    }

    public List<SalesData> getSalesByProductId(Long productId) {
        return salesDataRepository.findByProductId(productId);
    }

    public List<SalesData> getSalesByDateRange(LocalDate startDate, LocalDate endDate) {
        return salesDataRepository.findBySaleDateBetween(startDate, endDate);
    }

    public List<SalesData> getSalesByProductAndDateRange(Long productId, LocalDate startDate, LocalDate endDate) {
        return salesDataRepository.findByProductIdAndSaleDateBetween(productId, startDate, endDate);
    }
}

