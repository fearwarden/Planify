package com.fearwarden.basemodule.database.config;

import com.fearwarden.basemodule.models.CategoryEntity;
import com.fearwarden.basemodule.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class CategorySeeder {

    private final CategoryRepository categoryRepository;

    @Bean
    CommandLineRunner initCategory() {
        return args -> {

            if (this.categoryRepository.count() == 0) {
                this.categoryRepository.save(this.createCategory("Work"));
                this.categoryRepository.save(this.createCategory("Personal"));
                this.categoryRepository.save(this.createCategory("Health"));
                this.categoryRepository.save(this.createCategory("Education"));
                this.categoryRepository.save(this.createCategory("Home"));
                this.categoryRepository.save(this.createCategory("Finance"));
                this.categoryRepository.save(this.createCategory("Urgent"));
                this.categoryRepository.save(this.createCategory("Ideas"));
                this.categoryRepository.save(this.createCategory("Games"));
                this.categoryRepository.save(this.createCategory("Other"));
            }

        };
    }

    private CategoryEntity createCategory(String name) {
        CategoryEntity category = new CategoryEntity();
        category.setName(name);
        return category;
    }
}
