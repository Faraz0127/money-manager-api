package com.codewithfaraz.moneymanager.controller;

import com.codewithfaraz.moneymanager.dto.IncomeDTO;
import com.codewithfaraz.moneymanager.service.IncomeService;
import com.codewithfaraz.moneymanager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/incomes")
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomeService;
    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO dto) {
        IncomeDTO savedIncome = incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedIncome);
    }


    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getIncomes(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {
        Long profileId = profileService.getCurrentProfile().getId();

        List<IncomeDTO> incomes;

        if (startDate != null && endDate != null) {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            incomes = incomeService.getIncomesByDateRange(profileId,start, end);
        } else {
            // Default: return current month
            LocalDate start = LocalDate.now().withDayOfMonth(1);
            LocalDate end = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());
            incomes = incomeService.getIncomesByDateRange(profileId, start, end);
        }

        return ResponseEntity.ok(incomes);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

}
