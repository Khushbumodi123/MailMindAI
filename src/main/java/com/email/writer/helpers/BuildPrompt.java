package com.email.writer.helpers;

import com.email.writer.models.EmailRequest;

public class BuildPrompt {
    protected String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Please write a professional email reply for the following email content. Do not generate a subject line.");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            prompt.append(" The tone should be ").append(emailRequest.getTone()).append(".");       
        }
        prompt.append(" The email content is: ").append(emailRequest.getemailContent());
        return prompt.toString();   
    }
}