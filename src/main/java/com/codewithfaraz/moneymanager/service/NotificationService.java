package com.codewithfaraz.moneymanager.service;

import com.codewithfaraz.moneymanager.dto.ExpenseDTO;
import com.codewithfaraz.moneymanager.entity.ProfileEntity;
import com.codewithfaraz.moneymanager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${money.manager.frontend.url}")
    private String frontEndUrl;

    // Runs every day at 10:00 PM IST
    @Scheduled(cron = "0 0 22 * * *", zone = "IST")
    public void sendDailyIncomeExpenseReminder() {
        log.info("job started sendDailyIncomeExpenseReminder");

        List<ProfileEntity> profiles = profileRepository.findAll();

        for (ProfileEntity profile : profiles) {
            String body = "<h3>Hi " + profile.getFullName() + ",</h3>" +
                    "<p>This is a friendly reminder to add your income and expenses for today in Money Manager.</p>" +
                    "<a href='" + frontEndUrl + "' style='display:inline-block; padding:10px 20px; color:#fff; background-color:#800080; text-decoration:none; border-radius:5px;'>Go to Money Manager</a>" +
                    "<br/><br/><p>Best regards,<br/>Money Manager Team</p>";

            emailService.sendEmail(
                    profile.getEmail(),
                    "Daily reminder: Add your income and expenses",
                    body
            );
        }
    }


    // Runs every day at 11:00 PM IST
    @Scheduled(cron = "0 0 23 * * *", zone = "IST")
    public void sendDailyExpenseSummary() {
        log.info("job started sendDailyExpenseSummary");

        List<ProfileEntity> profiles = profileRepository.findAll();
        LocalDate today = LocalDate.now();

        for (ProfileEntity profile : profiles) {
            List<ExpenseDTO> todaysExpenses = expenseService.getExpensesForUserOnDate(profile.getId(), today);

            if (todaysExpenses != null && !todaysExpenses.isEmpty()) {
                StringBuilder table = new StringBuilder();
                table.append("<table style='border-collapse: collapse; width: 100%;'>");
                table.append("<tr>")
                        .append("<th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>S.No</th>")
                        .append("<th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Name</th>")
                        .append("<th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Amount</th>")
                        .append("<th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Category</th>")
                        .append("</tr>");

                int i = 1;
                for (ExpenseDTO expense : todaysExpenses) {
                    table.append("<tr>")
                            .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(i++).append("</td>")
                            .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expense.getName()).append("</td>")
                            .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expense.getAmount()).append("</td>")
                            .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expense.getCategoryId() != null ? expense.getCategoryName() : "").append("</td>")
                            .append("</tr>");
                }
                table.append("</table>");

                String body = "<h3>Hi " + profile.getFullName() + ",</h3>" +
                        "<p>Here is a summary of your expenses for today:</p>" +
                        table.toString() +
                        "<br/><br/><p>Best regards,<br/>Money Manager Team</p>";

                emailService.sendEmail(
                        profile.getEmail(),
                        "Your daily expense summary",
                        body
                );
            }
        }
        log.info("job completed sendDailyExpenseSummary");
    }

}
