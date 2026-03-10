package com.codewithfaraz.moneymanager.repository;

import com.codewithfaraz.moneymanager.entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Long > {

    // Fetches all incomes for the current user, sorted by date in descending order
    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

    // Fetches the 5 most recent incomes for the current user to display on the dashboard
    List<IncomeEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    // Calculates the sum of all incomes for the current user
    @Query("SELECT SUM(e.amount) FROM IncomeEntity e WHERE e.profile.id = :profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    // Used for the filter/search page to find incomes by date range, keyword, and custom sorting
    List<IncomeEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    // Used to fetch only the current month's incomes for the main incomes page
    List<IncomeEntity> findByProfileIdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Used by the background scheduler to fetch expenses for the daily summary email
    List<IncomeEntity> findByProfileIdAndDate(Long profileId, LocalDate date);
}
