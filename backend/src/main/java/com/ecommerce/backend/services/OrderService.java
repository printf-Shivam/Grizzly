package com.ecommerce.backend.services;

import com.ecommerce.backend.auth.dto.OrderResponse;
import com.ecommerce.backend.auth.entities.User;
import com.ecommerce.backend.dto.OrderDetails;
import com.ecommerce.backend.dto.OrderItemDetail;
import com.ecommerce.backend.dto.OrderRequest;
import com.ecommerce.backend.entities.*;
import com.ecommerce.backend.respository.OrderRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest, Principal principal) throws Exception {

        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        Address address = user.getAddressList()
                .stream()
                .filter(address1 -> orderRequest.getAddressId().equals(address1.getId()))
                .findFirst()
                .orElseThrow(BadRequestException::new);

        Order order = Order.builder()
                .user(user)
                .address(address)
                .totalAmount(orderRequest.getTotalAmount())
                .orderDate(orderRequest.getOrderDate())
                .discount(orderRequest.getDiscount())
                .expectedDeliveryDate(orderRequest.getExpectedDeliveryDate())
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderStatus(OrderStatus.PENDING)
                .build();

        List<OrderItem> orderItems = orderRequest.getOrderItemRequests()
                .stream()
                .map(orderItemRequest -> {
                    try {
                        Product product = productService.fetchProductById(orderItemRequest.getProductId());

                        return OrderItem.builder()
                                .product(product)
                                .productVariantId(orderItemRequest.getProductVariantId())
                                .quantity(orderItemRequest.getQuantity())
                                .order(order)
                                .build();

                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }).toList();

        order.setOrderItemList(orderItems);

        // simple payment placeholder
        Payment payment = new Payment();
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setPaymentDate(new Date());
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(orderRequest.getPaymentMethod());

        order.setPayment(payment);

        Order savedOrder = orderRepository.save(order);

        return OrderResponse.builder()
                .orderId(savedOrder.getId())
                .paymentMethod(orderRequest.getPaymentMethod())
                .build();
    }

    public List<OrderDetails> getOrdersByUser(String name) {

        User user = (User) userDetailsService.loadUserByUsername(name);

        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream().map(order ->

                OrderDetails.builder()
                        .id(order.getId())
                        .orderDate(order.getOrderDate())
                        .orderStatus(order.getOrderStatus())
                        .shipmentNumber(order.getShipmentTrackingNumber())
                        .address(order.getAddress())
                        .totalAmount(order.getTotalAmount())
                        .orderItemList(getItemDetails(order.getOrderItemList()))
                        .expectedDeliveryDate(order.getExpectedDeliveryDate())
                        .build()

        ).toList();
    }

    private List<OrderItemDetail> getItemDetails(List<OrderItem> orderItemList) {

        return orderItemList.stream().map(orderItem ->

                OrderItemDetail.builder()
                        .id(orderItem.getId())
                        .itemPrice(orderItem.getItemPrice())
                        .product(orderItem.getProduct())
                        .productVariantId(orderItem.getProductVariantId())
                        .quantity(orderItem.getQuantity())
                        .build()

        ).toList();
    }

    public void cancelOrder(UUID id, Principal principal) {

        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        Order order = orderRepository.findById(id).orElseThrow();

        if (order.getUser().getId().equals(user.getId())) {

            order.setOrderStatus(OrderStatus.CANCELLED);

            orderRepository.save(order);

        } else {
            throw new RuntimeException("Invalid request");
        }
    }
}