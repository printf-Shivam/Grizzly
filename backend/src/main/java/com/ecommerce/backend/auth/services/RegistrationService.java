package com.ecommerce.backend.auth.services;

import com.ecommerce.backend.auth.dto.RegistrationRequest;
import com.ecommerce.backend.auth.dto.RegistrationResponse;
import com.ecommerce.backend.auth.entities.User;
import com.ecommerce.backend.auth.helper.VerificationCodeGenerator;
import com.ecommerce.backend.auth.repositories.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public RegistrationResponse createUser(RegistrationRequest request) {
        User existing = userDetailRepository.findByEmail(request.getEmail());

        if(existing != null){
            return RegistrationResponse.builder()
                    .code(400)
                    .message("Email already exist")
                    .build();
        }

        try{
            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            user.setEnabled(false);
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setProvider("manual");

            String code = VerificationCodeGenerator.generateCode();
            user.setVerificationCode(code);



        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        //work from here, assign role and proceed
        return null;

    }
}
