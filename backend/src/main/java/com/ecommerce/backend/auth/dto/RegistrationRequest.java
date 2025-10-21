package com.ecommerce.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {

    private String email;
    private String firstName;
    private String lastName;
    private CharSequence password;
    private String phoneNumber;
}
