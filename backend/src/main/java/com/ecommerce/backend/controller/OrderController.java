package com.ecommerce.backend.controller;

import com.ecommerce.backend.auth.dto.OrderResponse;
import com.ecommerce.backend.dto.OrderDetails;
import com.ecommerce.backend.dto.OrderItemDetail;
import com.ecommerce.backend.dto.OrderRequest;
import com.ecommerce.backend.entities.Order;
import com.ecommerce.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest, Principal principal) throws Exception {
        OrderResponse orderResponse = orderService.createOrder(orderRequest, principal);
        return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable UUID id, Principal principal){
        orderService.cancelOrder(id, principal);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderDetails>> getOrderByUser(Principal principal) {
        List<OrderDetails> orders = orderService.getOrdersByUser(principal.getName());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
