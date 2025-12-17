package com.ecommerce.backend.controller;

import org.springframework.http.ResponseEntity;
import com.ecommerce.backend.dto.OrderRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.backend.entities.Order;

import java.security.Principal;

@RestController
@RequestMapping("/api/order")
public class OrderController {



    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest, Principal principal) {
        return null;

    }
}