package com.ecommerce.backend.services;

import com.ecommerce.backend.dto.ProductDto;
import com.ecommerce.backend.entities.Product;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    public Product addProduct(ProductDto productdto);
    public List<ProductDto> getAllProducts(UUID categoryId, UUID typeId);
    ProductDto getProductBySlug(String slug);
    
    ProductDto getProductById(UUID id);
    Product updateProduct(ProductDto productDto);

}
