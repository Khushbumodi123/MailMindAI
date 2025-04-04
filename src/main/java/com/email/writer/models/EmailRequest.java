package com.email.writer.models;

import lombok.Data;

@Data
public class EmailRequest{
    private String Content;
    private String tone;
}