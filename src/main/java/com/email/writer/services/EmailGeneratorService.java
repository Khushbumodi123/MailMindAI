package com.email.writer.services;

import org.springframework.stereotype.Service;
import com.email.writer.models.EmailRequest;
import com.email.writer.helpers.BuildPrompt;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;


@Service
public class EmailGeneratorService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Autowired
    private BuildPrompt buildPrompt;

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
        // Send the request to Gemini API
        // Get the response from Gemini API
        // Return the response
       
    }
}
