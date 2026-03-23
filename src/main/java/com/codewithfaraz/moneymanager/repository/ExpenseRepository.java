package com.codewithfaraz.moneymanager.repository;

import com.codewithfaraz.moneymanager.entity.ExpenseEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    // Fetches all expenses for the current user, sorted by date in descending order
    List<ExpenseEntity> findByProfileIdOrderByDateDesc(Long profileId);

    // Fetches the 5 most recent expenses for the current user to display on the dashboard
    List<ExpenseEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    // Calculates the sum of all expenses for the current user
    @Query("SELECT SUM(e.amount) FROM ExpenseEntity e WHERE e.profile.id = :profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    // Used for the filter/search page to find expenses by date range, keyword, and custom sorting
    List<ExpenseEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    // Used to fetch only the current month's expenses for the main Expense page
    List<ExpenseEntity> findByProfileIdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Used by the background scheduler to fetch expenses for the daily summary email
    List<ExpenseEntity> findByProfileIdAndDate(Long profileId, LocalDate date);

    List<ExpenseEntity> findByProfileIdAndDateBetweenOrderByDateDesc(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );
}
