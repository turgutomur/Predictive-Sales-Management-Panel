package com.salesforecast.salespanel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.salesforecast.salespanel.model.SalesData;
import com.salesforecast.salespanel.model.service.SalesDataService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SalesDataController {

    @Autowired
    private SalesDataService salesDataService;

    @PostMapping
    public SalesData createSalesData(@RequestBody SalesData salesData) {
        return salesDataService.saveSalesData(salesData);
    }

    @GetMapping
    public List<SalesData> getAllSales() {
        return salesDataService.getAllSales();
    }

    @GetMapping("/product/{productId}")
    public List<SalesData> getSalesByProductId(@PathVariable Long productId) {
        return salesDataService.getSalesByProductId(productId);
    }

    @GetMapping("/range")
    public List<SalesData> getSalesByDateRange(@RequestParam String start, @RequestParam String end) {
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);
        return salesDataService.getSalesByDateRange(startDate, endDate);
    }

    @GetMapping("/product/{productId}/range")
    public List<SalesData> getProductSalesByDateRange(
            @PathVariable Long productId,
            @RequestParam String start,
            @RequestParam String end
    ) {
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);
        return salesDataService.getSalesByProductAndDateRange(productId, startDate, endDate);
    }
}
