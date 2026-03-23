package com.codewithfaraz.moneymanager.controller;

import com.codewithfaraz.moneymanager.dto.ExpenseDTO;
import com.codewithfaraz.moneymanager.service.ExpenseService;
import com.codewithfaraz.moneymanager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;
    private final ProfileService profileService; // ✅ ADD THIS

    @PostMapping
    public ResponseEntity<ExpenseDTO> addExpense(@RequestBody ExpenseDTO dto) {
        ExpenseDTO savedExpense = expenseService.addExpense(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
    }


    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getExpenses(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {
        Long profileId = profileService.getCurrentProfile().getId(); // ✅ FIX

        List<ExpenseDTO> expenses;

        if (startDate != null && endDate != null) {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            expenses = expenseService.getExpensesByDateRange(profileId, start, end);
        } else {
            // Default: current month
            LocalDate start = LocalDate.now().withDayOfMonth(1);
            LocalDate end = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());
            expenses = expenseService.getExpensesByDateRange(profileId, start, end);
        }

        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }


}
