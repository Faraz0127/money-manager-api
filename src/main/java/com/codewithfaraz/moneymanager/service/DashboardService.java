package com.codewithfaraz.moneymanager.service;

import com.codewithfaraz.moneymanager.dto.ExpenseDTO;
import com.codewithfaraz.moneymanager.dto.IncomeDTO;
import com.codewithfaraz.moneymanager.dto.RecentTransactionDTO;
import com.codewithfaraz.moneymanager.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    public Map<String, Object> getDashboardData() {
        ProfileEntity profile = profileService.getCurrentProfile();

        // Using a LinkedHashMap to preserve the order of insertion
        Map<String, Object> returnValue = new LinkedHashMap<>();

        // Fetching the latest 5 incomes and expenses
        List<IncomeDTO> latestIncomes = incomeService.getLatestFiveIncomesForCurrentUser();
        List<ExpenseDTO> latestExpenses = expenseService.getLatestFiveExpensesForCurrentUser();

        // Concatenating both lists and mapping them to a common DTO format
        List<RecentTransactionDTO> recentTransactions = Stream.concat(
                latestIncomes.stream().map(income -> RecentTransactionDTO.builder()
                        .id(income.getId())
                        .profileId(profile.getId())
                        .icon(income.getIcon())
                        .name(income.getName())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .createdAt(income.getCreatedAt())
                        .updatedAt(income.getUpdatedAt())
                        .type("income") // Hardcoded type tag
                        .build()),
                latestExpenses.stream().map(expense -> RecentTransactionDTO.builder()
                        .id(expense.getId())
                        .profileId(profile.getId())
                        .icon(expense.getIcon())
                        .name(expense.getName())
                        .amount(expense.getAmount())
                        .date(expense.getDate())
                        .createdAt(expense.getCreatedAt())
                        .updatedAt(expense.getUpdatedAt())
                        .type("expense") // Hardcoded type tag
                        .build())
        )

                // Sorting logic: Sort by date descending. If dates are the same, fall back to created timestamp.
                .sorted((a, b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if (cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null) {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return cmp;
                })
                .collect(Collectors.toList());

        // Populating the return map
        returnValue.put("totalBalance", incomeService.getTotalIncomeForCurrentUser().subtract(expenseService.getTotalExpenseForCurrentUser()));
        returnValue.put("totalIncome", incomeService.getTotalIncomeForCurrentUser());
        returnValue.put("totalExpense", expenseService.getTotalExpenseForCurrentUser());
        returnValue.put("recentFiveExpenses", latestExpenses);
        returnValue.put("recentFiveIncomes", latestIncomes);
        returnValue.put("recentTransactions", recentTransactions);

        return returnValue;
    }
    }
