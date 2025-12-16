package com.ecommerce.backend.services;

import com.ecommerce.backend.auth.entities.User;
import com.ecommerce.backend.dto.AddressRequest;
import com.ecommerce.backend.entities.Address;
import com.ecommerce.backend.repository.AddressRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class AddressService {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AddressRepository addressRepository;
 
    public Address createAddress(@RequestBody AddressRequest addressRequest, Principal principal){
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        Address address = Address.builder()
                .street(addressRequest.getStreet())
                .city(addressRequest.getCity())
                .state(addressRequest.getState())
                .zipCode(addressRequest.getZipCode())
                .phoneNumber(addressRequest.getPhoneNumber())
                .build();
        return addressRepository.save(address);
    }
}
