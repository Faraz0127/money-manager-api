package com.codewithfaraz.moneymanager.controller;

import com.codewithfaraz.moneymanager.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardData(
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        Map<String, Object> dashboardData =
                dashboardService.getDashboardData(startDate, endDate);

        return ResponseEntity.ok(dashboardData);
    }
}