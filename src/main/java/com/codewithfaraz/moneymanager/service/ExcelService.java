package com.codewithfaraz.moneymanager.service;

import com.codewithfaraz.moneymanager.dto.ExpenseDTO;
import com.codewithfaraz.moneymanager.dto.IncomeDTO;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ExcelService {

    // 1. Method to generate Excel for Incomes
    public void writeIncomesToExcel(OutputStream outputStream, List<IncomeDTO> incomes) throws IOException {
        // Using try-with-resources to automatically close the workbook
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("incomes");
            Row header = sheet.createRow(0);

            // Creating Header Row Columns
            header.createCell(0).setCellValue("Serial Number");
            header.createCell(1).setCellValue("Name");
            header.createCell(2).setCellValue("Category");
            header.createCell(3).setCellValue("Amount");
            header.createCell(4).setCellValue("Date");

            // Looping through the income records
            IntStream.range(0, incomes.size()).forEach(i -> {
                IncomeDTO income = incomes.get(i);
                Row row = sheet.createRow(i + 1); // +1 because row 0 is the header

                // Column 0: Serial Number
                row.createCell(0).setCellValue(i + 1);

                // Column 1: Name
                if (income.getName() != null) {
                    row.createCell(1).setCellValue(income.getName());
                } else {
                    row.createCell(1).setCellValue("Not Available");
                }

                // Column 2: Category
                if (income.getCategoryId() != null) {
                    row.createCell(2).setCellValue(income.getCategoryName());
                }

                // Column 3: Amount
                if (income.getAmount() != null) {
                    row.createCell(3).setCellValue(income.getAmount().toString());
                }

                // Column 4: Date
                if (income.getDate() != null) {
                    row.createCell(4).setCellValue(income.getDate().toString());
                }
            });

            // Write the generated workbook to the output stream
            workbook.write(outputStream);
        }
    }

    // 2. Method to generate Excel for Expenses (Mirrors the Income method)
    public void writeExpensesToExcel(OutputStream outputStream, List<ExpenseDTO> expenses) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("expenses");
            Row header = sheet.createRow(0);

            // Creating Header Row Columns
            header.createCell(0).setCellValue("Serial Number");
            header.createCell(1).setCellValue("Name");
            header.createCell(2).setCellValue("Category");
            header.createCell(3).setCellValue("Amount");
            header.createCell(4).setCellValue("Date");

            // Looping through the expense records
            IntStream.range(0, expenses.size()).forEach(i -> {
                ExpenseDTO expense = expenses.get(i);
                Row row = sheet.createRow(i + 1);

                // Column 0: Serial Number
                row.createCell(0).setCellValue(i + 1);

                // Column 1: Name
                if (expense.getName() != null) {
                    row.createCell(1).setCellValue(expense.getName());
                } else {
                    row.createCell(1).setCellValue("Not Available");
                }

                // Column 2: Category
                if (expense.getCategoryId() != null) {
                    row.createCell(2).setCellValue(expense.getCategoryName());
                }

                // Column 3: Amount
                if (expense.getAmount() != null) {
                    row.createCell(3).setCellValue(expense.getAmount().toString());
                }

                // Column 4: Date
                if (expense.getDate() != null) {
                    row.createCell(4).setCellValue(expense.getDate().toString());
                }
            });

            workbook.write(outputStream);
        }
    }
}
