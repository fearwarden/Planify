package com.fearwarden.tasks.database.config;

import com.fearwarden.tasks.models.PriorityEntity;
import com.fearwarden.tasks.repositories.PriorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class PrioritySeeder {
    private final PriorityRepository priorityRepository;

    @Bean
    CommandLineRunner initPriority() {
        return args -> {
            if (this.priorityRepository.count() == 0) {
                this.priorityRepository.save(this.createPriority("HIGH"));
                this.priorityRepository.save(this.createPriority("MEDIUM"));
                this.priorityRepository.save(this.createPriority("LOW"));
            }
        };
    }

    private PriorityEntity createPriority(String level) {
        PriorityEntity priority = new PriorityEntity();
        priority.setLevel(level);
        return priority;
    }

}
