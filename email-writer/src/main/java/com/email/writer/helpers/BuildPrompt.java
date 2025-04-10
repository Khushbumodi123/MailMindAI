package com.email.writer.helpers;

import org.springframework.stereotype.Component;

import com.email.writer.models.EmailRequest;

@Component
public class BuildPrompt {
    public String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Please write a professional email reply for the following email content. Do not generate a subject line.");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            prompt.append(" The tone should be ").append(emailRequest.getTone()).append(".");       
        }
        prompt.append(" The email content is: ").append(emailRequest.getContent());
        return prompt.toString();   
    }
}