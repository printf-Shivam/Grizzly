package com.ecommerce.backend.auth.services;

import com.ecommerce.backend.auth.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendMail(User user){
        String subject = "Verify your mail";
        String SenderName = "Grizzly";
        String mailContent = "Greetings, " + user.getUsername() + "\n"
                + "Your verification code is: " + user.getVerificationCode() + "\n"
                + SenderName;
        try{
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(user.getEmail());
            mailMessage.setText(mailContent);
            mailMessage.setSubject(subject);
            javaMailSender.send(mailMessage);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "Email sent";
    }
}
