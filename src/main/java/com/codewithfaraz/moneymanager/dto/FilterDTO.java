package com.codewithfaraz.moneymanager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FilterDTO {

    // Marks whether it is filtering an "income" or "expense"
    private String type;

    // Used for the date range filter
    private LocalDate startDate;
    private LocalDate endDate;

    // Used for searching by transaction name
    private String keyword;

    // Defines which column to sort by (e.g., "date", "amount", "name")
    private String sortField;

    // Defines the direction of the sort ("ASC" or "DESC")
    private String sortOrder;

}
