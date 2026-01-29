package com.ecommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.ecommerce.backend.dto.OrderRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.backend.entities.Order;
import com.ecommerce.backend.services.OrderService;

import java.security.Principal;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping
        public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest, Principal principal) throws Exception {
        Order order = orderService.createOrder(orderRequest,principal);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
}