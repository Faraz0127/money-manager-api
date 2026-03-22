package com.codewithfaraz.moneymanager.controller;

import com.codewithfaraz.moneymanager.service.ExcelService;
import com.codewithfaraz.moneymanager.service.ExpenseService;
import com.codewithfaraz.moneymanager.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/excel")
@RequiredArgsConstructor
public class ExcelController {

    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    // 1. Endpoint to generate and download the Income Excel report
    @GetMapping("/download/income")
    public void downloadIncomeExcel(HttpServletResponse response) throws IOException {
        // Set the response content type to the standard Excel XLSX format
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        // Force the browser to download the file rather than trying to display it
        response.setHeader("Content-Disposition", "attachment; filename=income.xlsx");

        // Stream the file directly to the response output
        excelService.writeIncomesToExcel(
                response.getOutputStream(),
                incomeService.getCurrentMonthIncomesForCurrentUser()
        );
    }

    // 2. Endpoint to generate and download the Expense Excel report
    @GetMapping("/download/expense")
    public void downloadExpenseExcel(HttpServletResponse response) throws IOException {
        // Set the response content type to the standard Excel XLSX format
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        // Force the browser to download the file rather than trying to display it
        response.setHeader("Content-Disposition", "attachment; filename=expense.xlsx");

        // Stream the file directly to the response output
        excelService.writeExpensesToExcel(
                response.getOutputStream(),
                expenseService.getCurrentMonthExpensesForCurrentUser()
        );
    }
}
