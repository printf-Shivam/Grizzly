package com.ecommerce.backend.services;

import com.ecommerce.backend.auth.entities.User;
import com.ecommerce.backend.dto.OrderRequest;
import com.ecommerce.backend.entities.Address;
import com.ecommerce.backend.entities.Order;
import org.apache.coyote.BadRequestException;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;

public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    public Order createOrder(OrderRequest orderRequest, Principal principal) throws BadRequestException {

        User user = (User)userDetailsService.loadUserByUsername(principal.getName());
        Address address = user.getAddressList().stream().filter((address1) -> orderRequest.getAddressId()== address1.getId()).findFirst().orElseThrow(BadRequestException:: new);
        
        //start from here 
        
        return null;
    }
}
