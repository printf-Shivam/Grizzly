package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.ProductDto;
import com.ecommerce.backend.dto.ProductResourceDto;
import com.ecommerce.backend.dto.ProductVariantDto;
import com.ecommerce.backend.entities.*;
import com.ecommerce.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    @Autowired
    private CategoryService categoryService;

    public Product mapToProductEntity(ProductDto productDto){
        Product product = new Product();
        if(null != productDto.getId()){
            product.setId(productDto.getId());
        }
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setBrand(productDto.getBrand());
        product.setNewArrival(productDto.isNewArrival());
        product.setPrice(productDto.getPrice());
        product.setRating(productDto.getRating());

        Category category= categoryService.getCategory(productDto.getCategoryId());
        if(category!=null){
            product.setCategory(category);
            UUID categoryTypeId = productDto.getCategoryTypeId();
            CategoryType categoryType = category.getCategoryType().stream().filter(categoryType1 -> categoryType1.getId().equals(categoryTypeId)).findFirst().orElse(null);
            product.setCategoryType(categoryType);
        }
        if(productDto.getVariants() !=null){
            product.setProductVariants(mapToProductVariant(productDto.getVariants(),product));
        }

        if(productDto.getProductResources() != null){
            product.setResources(mapToProductResources(productDto.getProductResources(), product));
        }

        return product;
    }

    private List<Resources> mapToProductResources(List<ProductResourceDto> productResources, Product product) {
        return productResources.stream().map(productResourceDto -> {
            Resources resources = new Resources();
            resources.setName(productResourceDto.getName());
            resources.setType(productResourceDto.getType());
            resources.setUrl(productResourceDto.getUrl());
            resources.setProduct(product);
            return resources;
        }).collect(Collectors.toList());
    }

    private List<ProductVariant> mapToProductVariant(List<ProductVariantDto> productVariantDtos, Product product){
        return productVariantDtos.stream().map(productVariantDto -> {
            ProductVariant productVariant= new ProductVariant();
            productVariant.setColor(productVariantDto.getColor());
            productVariant.setSize(productVariantDto.getSize());
            productVariant.setStockQuantity(productVariantDto.getStockQuantitiy());
            productVariant.setProduct(product);
            return productVariant;
        }).collect(Collectors.toList());
    }

    public List<ProductDto> getProductDtos(List<Product> products) {
        return products.stream().map(this::mapProductToDto).toList();
    }

    private ProductDto mapProductToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .brand(product.getBrand())
                .name(product.getName())
                .price(product.getPrice())
                .isNewArrival((product.isNewArrival()))
                .rating(product.getRating())
                .description(product.getDescription())
                .thumbnail(getProductThumbnail(product.getResources()))
                .build();
    }

    private String getProductThumbnail(List<Resources> resources) {
        return resources.stream()
                .filter(r -> r.isPrimary())
                .map(Resources::getUrl)
                .findFirst()
                .orElseGet(() -> resources.isEmpty()
                        ? "/images/default-thumbnail.png"
                        : resources.get(0).getUrl());
    }


}

