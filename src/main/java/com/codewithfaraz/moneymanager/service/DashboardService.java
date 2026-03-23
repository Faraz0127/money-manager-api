package com.codewithfaraz.moneymanager.service;

import com.codewithfaraz.moneymanager.dto.ExpenseDTO;
import com.codewithfaraz.moneymanager.dto.IncomeDTO;
import com.codewithfaraz.moneymanager.dto.RecentTransactionDTO;
import com.codewithfaraz.moneymanager.entity.ProfileEntity;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Data
public class DashboardService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    public Map<String, Object> getDashboardData(String startDate, String endDate) {

        ProfileEntity profile = profileService.getCurrentProfile();

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        Map<String, Object> returnValue = new LinkedHashMap<>();

        // ✅ FILTERED DATA (IMPORTANT)
        List<IncomeDTO> incomes =
                incomeService.getIncomesByDateRange(profile.getId(), start, end);

        List<ExpenseDTO> expenses =
                expenseService.getExpensesByDateRange(profile.getId(), start, end);

        // ✅ TOTALS
        var totalIncome = incomes.stream()
                .map(IncomeDTO::getAmount)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

        var totalExpense = expenses.stream()
                .map(ExpenseDTO::getAmount)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

        var balance = totalIncome.subtract(totalExpense);

        // ✅ RECENT (LIMIT 5)
        List<IncomeDTO> latestIncomes = incomes.stream()
                .sorted(Comparator.comparing(IncomeDTO::getDate).reversed())
                .limit(5)
                .toList();

        List<ExpenseDTO> latestExpenses = expenses.stream()
                .sorted(Comparator.comparing(ExpenseDTO::getDate).reversed())
                .limit(5)
                .toList();

        // ✅ MERGE TRANSACTIONS
        List<RecentTransactionDTO> recentTransactions =
                Stream.concat(
                                latestIncomes.stream().map(income ->
                                        RecentTransactionDTO.builder()
                                                .id(income.getId())
                                                .profileId(profile.getId())
                                                .icon(income.getIcon())
                                                .name(income.getName())
                                                .amount(income.getAmount())
                                                .date(income.getDate())
                                                .createdAt(income.getCreatedAt())
                                                .updatedAt(income.getUpdatedAt())
                                                .type("income")
                                                .build()
                                ),
                                latestExpenses.stream().map(expense ->
                                        RecentTransactionDTO.builder()
                                                .id(expense.getId())
                                                .profileId(profile.getId())
                                                .icon(expense.getIcon())
                                                .name(expense.getName())
                                                .amount(expense.getAmount())
                                                .date(expense.getDate())
                                                .createdAt(expense.getCreatedAt())
                                                .updatedAt(expense.getUpdatedAt())
                                                .type("expense")
                                                .build()
                                )
                        )
                        .sorted((a, b) -> {
                            int cmp = b.getDate().compareTo(a.getDate());
                            if (cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null) {
                                return b.getCreatedAt().compareTo(a.getCreatedAt());
                            }
                            return cmp;
                        })
                        .collect(Collectors.toList());

        // ✅ RESPONSE
        returnValue.put("totalBalance", balance);
        returnValue.put("totalIncome", totalIncome);
        returnValue.put("totalExpense", totalExpense);
        returnValue.put("recentFiveExpenses", latestExpenses);
        returnValue.put("recentFiveIncomes", latestIncomes);
        returnValue.put("recentTransactions", recentTransactions);

        return returnValue;
    }
}