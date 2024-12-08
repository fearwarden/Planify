package com.fearwarden.diaries.metadata.seeders;

import com.fearwarden.diaries.metadata.models.TypeEntity;
import com.fearwarden.diaries.metadata.repositories.TypeEntityRepository;
import com.fearwarden.diaries.metadata.models.PriorityEntity;
import com.fearwarden.diaries.metadata.models.StatusEntity;
import com.fearwarden.diaries.metadata.repositories.PriorityRepository;
import com.fearwarden.diaries.metadata.repositories.StatusRepository;
import com.fearwarden.diaries.metadata.models.CategoryEntity;
import com.fearwarden.diaries.metadata.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

@Configuration
@RequiredArgsConstructor
public class Seeder {
    private final CategoryRepository categoryRepository;
    private final PriorityRepository priorityRepository;
    private final StatusRepository statusRepository;
    private final TypeEntityRepository typeRepository;

    @Bean
    CommandLineRunner initPriority() {
        return args -> {
            if (categoryRepository.count() == 0) {
                categoryRepository.save(createCategory("Work"));
                categoryRepository.save(createCategory("Personal"));
                categoryRepository.save(createCategory("Health"));
                categoryRepository.save(createCategory("Education"));
                categoryRepository.save(createCategory("Home"));
                categoryRepository.save(createCategory("Finance"));
                categoryRepository.save(createCategory("Urgent"));
                categoryRepository.save(createCategory("Ideas"));
                categoryRepository.save(createCategory("Games"));
                categoryRepository.save(createCategory("Other"));
            }

            if (priorityRepository.count() == 0) {
                priorityRepository.save(createPriority("HIGH"));
                priorityRepository.save(createPriority("MEDIUM"));
                priorityRepository.save(createPriority("LOW"));
            }

            if (statusRepository.count() == 0) {
                statusRepository.save(createStatus("PROGRESS"));
                statusRepository.save(createStatus("COMPLETE"));
                statusRepository.save(createStatus("ON HOLD"));
                statusRepository.save(createStatus("TO DO"));
            }

            if (typeRepository.count() == 0) {
                typeRepository.save(createType("FEATURE"));
                typeRepository.save(createType("BUG"));
                typeRepository.save(createType("TASK"));
            }
        };
    }

    private CategoryEntity createCategory(String name) {
        CategoryEntity category = new CategoryEntity();
        category.setName(name);
        return category;
    }

    private PriorityEntity createPriority(String level) {
        PriorityEntity priority = new PriorityEntity();
        priority.setLevel(level);
        return priority;
    }

    private StatusEntity createStatus(String progress) {
        StatusEntity status = new StatusEntity();
        status.setProgress(progress);
        return status;
    }

    private TypeEntity createType(String type) {
        TypeEntity typeEntity = new TypeEntity();
        typeEntity.setType(type);
        return typeEntity;
    }

}
