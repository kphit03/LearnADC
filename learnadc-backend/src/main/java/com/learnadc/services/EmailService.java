package com.learnadc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender; //adding JavaMailSender, configured automatically from application.properties file

    @Autowired //dependency injection
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(String name, String email, String subject, String messageBody) { //sending email mehotd that will be called by controller when user sends the post request
        SimpleMailMessage message = new SimpleMailMessage(); //plain-text email in spring boot
        message.setTo("learnadcassist@gmail.com"); // destination (in our case, when user submits form, it should get sent to a learnadc support email
        message.setSubject(subject.isEmpty() ? "New Contact Form Message" : subject); //if user didnt put a subject, default to this message, otherwise use the users subject
        message.setText("Name: " + name + "\n" + "Email: " + email + "\n\n" + "Message:" + "\n" + messageBody); //organizing text when it gets sent
        mailSender.send(message); //send the mail! spring boot and gmail smtp take care of the actual transmission
    }
}
