package com.ecommerce.backend.services;

import com.ecommerce.backend.Exception.ResorceNotFoundEx;
import com.ecommerce.backend.dto.CategoryDto;
import com.ecommerce.backend.dto.CategoryTypeDto;
import com.ecommerce.backend.entities.Category;
import com.ecommerce.backend.entities.CategoryType;
import com.ecommerce.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public Category getCategory(UUID categoryId){
        Optional<Category> category= categoryRepository.findById(categoryId);
        return category.orElse(null);
    }

    public Category createCategory(CategoryDto categoryDto){
        Category category = mapToEntity(categoryDto);
        return categoryRepository.save(category);
    }

    private Category mapToEntity(CategoryDto categoryDto){
        Category category = Category.builder()
                .code(categoryDto.getCode())
                .description(categoryDto.getDescription())
                .name(categoryDto.getName())
                .build();
        if(null!=categoryDto.getCategoryTypes()){
            List<CategoryType> categoryTypes=mapToCategoryTypesList(categoryDto.getCategoryTypes(), category);
            category.setCategoryType(categoryTypes);
        }
        return category;
    }

    private List<CategoryType> mapToCategoryTypesList(List<CategoryTypeDto> categoryTypeList, Category category) {
        return categoryTypeList.stream().map(categoryTypeDto -> {
            CategoryType categoryType = new CategoryType();
            categoryType.setCode(categoryTypeDto.getCode());
            categoryType.setName(categoryTypeDto.getName());
            categoryType.setDescription(categoryTypeDto.getDescription());
            categoryType.setCategory(category);
            return categoryType;
        }).collect(Collectors.toList());
    }

    public List<Category> getAllCategory() {
        System.out.println("in get all category");
        return categoryRepository.findAll();
    }

    public Category updateCategory(CategoryDto categoryDto, UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResorceNotFoundEx("Category not found with id " + categoryDto.getId()));

        if (categoryDto.getName() != null) {
            category.setName(categoryDto.getName());
        }
        if (categoryDto.getCode() != null) {
            category.setCode(categoryDto.getCode());
        }
        if (categoryDto.getDescription() != null) {
            category.setDescription(categoryDto.getDescription());
        }

        // Remove all existing category types to prevent duplicates
        category.getCategoryType().clear();

        if (categoryDto.getCategoryTypes() != null) {
            List<CategoryType> newTypes = categoryDto.getCategoryTypes().stream()
                    .map(categoryTypeDto -> {
                        CategoryType categoryType = new CategoryType();
                        categoryType.setCode(categoryTypeDto.getCode());
                        categoryType.setName(categoryTypeDto.getName());
                        categoryType.setDescription(categoryTypeDto.getDescription());
                        categoryType.setCategory(category);
                        return categoryType;
                    })
                    .collect(Collectors.toList());

            category.getCategoryType().addAll(newTypes);
        }

        return categoryRepository.save(category);
    }

    public void deleteCategory(UUID categoryId){
        categoryRepository.deleteById(categoryId);
    }
}
