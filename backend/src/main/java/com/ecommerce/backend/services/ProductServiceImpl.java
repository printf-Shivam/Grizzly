package com.ecommerce.backend.services;

import com.ecommerce.backend.dto.ProductDto;
import com.ecommerce.backend.entities.*;
import com.ecommerce.backend.mapper.ProductMapper;
import com.ecommerce.backend.respository.ProductRepository;
import com.ecommerce.backend.specification.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    ProductMapper productMapper;

    @Override
    public Product addProduct(ProductDto productDto) {
        Product product = productMapper.mapToProductEntity(productDto);

        return productRepository.save(product);
    }

    @Override
    public List<ProductDto> getAllProduct(UUID categoryId, UUID typeId) {
        Specification<Product> productSpecification = Specification.where(null);

        if (null != categoryId) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
        }
        if (null != typeId) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
        }
        List<Product> products = productRepository.findAll(productSpecification);

        return productMapper.getProductDtos(products);
    }
}