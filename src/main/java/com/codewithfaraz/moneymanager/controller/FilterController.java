package com.codewithfaraz.moneymanager.controller;

import com.codewithfaraz.moneymanager.dto.ExpenseDTO;
import com.codewithfaraz.moneymanager.dto.FilterDTO;
import com.codewithfaraz.moneymanager.dto.IncomeDTO;
import com.codewithfaraz.moneymanager.service.ExpenseService;
import com.codewithfaraz.moneymanager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/filter")
@RequiredArgsConstructor
public class FilterController {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDTO filter) {

        // 1. Preparing and Validating Data (Setting Defaults)
        LocalDate startDate = filter.getStartDate() != null ? filter.getStartDate() : LocalDate.MIN;
        LocalDate endDate = filter.getEndDate() != null ? filter.getEndDate() : LocalDate.now();
        String keyword = filter.getKeyword() != null ? filter.getKeyword() : "";
        String sortField = filter.getSortField() != null ? filter.getSortField() : "date";

        Sort.Direction direction = "DESC".equalsIgnoreCase(filter.getSortOrder())
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Sort sort = Sort.by(direction, sortField);

        // 2. Branching based on Type
        if ("income".equalsIgnoreCase(filter.getType())) {
            List<IncomeDTO> incomes = incomeService.filterIncomes(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(incomes);

        } else if ("expense".equalsIgnoreCase(filter.getType())) {
            List<ExpenseDTO> expenses = expenseService.filterExpenses(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(expenses);
        }

        // 3. Fallback for invalid types
        return ResponseEntity.badRequest().body("invalid type must be income or expense");
    }
}
