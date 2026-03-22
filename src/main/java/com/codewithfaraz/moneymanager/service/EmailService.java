package com.codewithfaraz.moneymanager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    @Value("${BREVO_FROM_EMAIL}")
    private String fromEmail;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.brevo.com/v3")
            .build();

    public void sendEmail(String to, String subject, String body) {
        Map<String, Object> request = Map.of(
                "sender", Map.of("email", fromEmail, "name", "Money Manager"),
                "to", List.of(Map.of("email", to)),
                "subject", subject,
                "textContent", body
        );

        String response = webClient.post()
                .uri("/smtp/email")
                .header("api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        System.out.println("Brevo API response: " + response);
    }

    /**
     * Method to send an email with a file attachment (e.g., Excel Reports)
     */
    public void sendEmailWithAttachment(String toAddress, String subject, String body,
                                        byte[] attachment, String fileName) {
        // Brevo requires attachments to be Base64-encoded strings
        String encodedAttachment = Base64.getEncoder().encodeToString(attachment);

        Map<String, Object> request = Map.of(
                "sender", Map.of("email", fromEmail, "name", "Money Manager"),
                "to", List.of(Map.of("email", toAddress)),
                "subject", subject,
                "textContent", body,
                "attachment", List.of(Map.of(
                        "name", fileName,
                        "content", encodedAttachment   // Base64 content
                ))
        );

        String response = webClient.post()
                .uri("/smtp/email")
                .header("api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        System.out.println("Brevo attachment email response: " + response);
    }
}