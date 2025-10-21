package com.ecommerce.backend.auth.helper;

import java.util.Random;

public class VerificationCodeGenerator {
    public static String generateCode(){
        Random num = new Random();
        int code = 100000 + num.nextInt(900000);
        return String.valueOf(code);
    }
}