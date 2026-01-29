package com.ecommerce.backend.services;

import com.ecommerce.backend.auth.entities.User;
import com.ecommerce.backend.dto.OrderRequest;
import com.ecommerce.backend.entities.Address;
import com.ecommerce.backend.entities.Order;
import com.ecommerce.backend.entities.OrderItem;
import com.ecommerce.backend.entities.OrderStatus;
import com.ecommerce.backend.entities.Payment;
import com.ecommerce.backend.entities.PaymentStatus;
import com.ecommerce.backend.entities.Product;
import com.ecommerce.backend.entities.ProductVariant;

import org.apache.coyote.BadRequestException;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Date;



@Service
public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Transactional
    public Order createOrder(OrderRequest orderRequest, Principal principal)throws Exception {

        User user = (User)userDetailsService.loadUserByUsername(principal.getName());
        Address address = user.getAddressList().stream().filter((address1) -> orderRequest.getAddressId().equals(address1.getId())).findFirst().orElseThrow(BadRequestException:: new);

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

        List<OrderItem> orderItems = orderRequest.getOrderItemRequests().stream().map(orderItemRequest -> {
            try {
                Product product = productService.fetchProductById(orderItemRequest.getProductId());
                ProductVariant productVariant = product.getProductVariants().stream().filter(productVariant1 ->
                    productVariant1.getId() == orderItemRequest.getProductVariantId()).findFirst().orElseThrow(BadRequestException::new);
                OrderItem orderItem = OrderItem.builder()
                        .product(product)
                        .productVariantId(orderItemRequest.getProductVariantId())
                        .quantity(orderItemRequest.getQuantity())
                        .order(order)
                        .build();
                return orderItem;

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();

        order.setOrderItemList(orderItems);
        Payment payment = new Payment();
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setPaymentDate(new Date());
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod("");
        order.setPayment(payment);

        return orderRepository.save(order);
        
    }
}
