package com.learnadc.controllers;


import com.learnadc.dto.ContactRequestDTO;
import com.learnadc.services.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final EmailService emailService;

    @Autowired
    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }


    @PostMapping
    public void sendContactMessage(@Valid @RequestBody ContactRequestDTO request) { //reminder, requestbody maps the incoming json into a contactrequestdto object here
        //executing the sendContactEmail method, takes the following parameters ===> "sendContactEmail(String name, String email, String subject, String messageBody)"
        emailService.sendContactEmail(
                request.getName(), //str name
                request.getEmail(), //str email
                request.getSubject() != null ? request.getSubject() : "", //str subject
                request.getMessage() //str messagebody
        );


    }
}
