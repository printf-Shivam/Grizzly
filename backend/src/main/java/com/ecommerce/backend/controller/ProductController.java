package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.ProductDto;
import com.ecommerce.backend.entities.Product;
import com.ecommerce.backend.services.ProductService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(@RequestParam(required = false, name = "categoryId")UUID categoryId, @RequestParam(required = false) UUID typeId){
        List<ProductDto> productList = productService.getAllProduct(categoryId, typeId);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productdto ){
        Product product = productService.addProduct(productdto);
        return new ResponseEntity<Product>(product, HttpStatus.CREATED);
    }
}
