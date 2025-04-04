package com.email.writer.services;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.email.writer.models.EmailRequest;
import com.email.writer.helpers.BuildPrompt;
import com.email.writer.helpers.ExtractResponseContent;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;


@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient webClient) {
        this.webClient = webClient;     
    }

    @Autowired
    private BuildPrompt buildPrompt;

    @Autowired
    private ExtractResponseContent extractResponse;

    public String generateEmail(EmailRequest emailRequest) {
        //Build a prompt
        String prompt = buildPrompt.buildPrompt(emailRequest);
        // Craft a request to Gemini API
        Map<String, Object> requestBody = Map.of(
            "contents",new Object[] {
                Map.of(
                    "parts", new Object[]{
                        Map.of(
                            "text", prompt
                        )
                    }
                )
            }
        );
        // Send the request to Gemini API and get the response from Gemini API
        String response = webClient.post()
            .uri(geminiApiUrl+geminiApiKey)
            .header("Content-Type", "application/json")
            .retrieve()
            .bodyToMono(String.class)
            .block();
        // Return the extracted response
        return extractResponse.extractResponseContent(response);
       
    }
}
