package com.fearwarden.tasks.database.config;

import com.fearwarden.tasks.models.PriorityEntity;
import com.fearwarden.tasks.models.StatusEntity;
import com.fearwarden.tasks.repositories.PriorityRepository;
import com.fearwarden.tasks.repositories.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class TasksModuleSeeder {
    private final PriorityRepository priorityRepository;
    private final StatusRepository statusRepository;

    @Bean
    CommandLineRunner initPriority() {
        return args -> {
            if (this.priorityRepository.count() == 0) {
                this.priorityRepository.save(this.createPriority("HIGH"));
                this.priorityRepository.save(this.createPriority("MEDIUM"));
                this.priorityRepository.save(this.createPriority("LOW"));
            }

            if (this.statusRepository.count() == 0) {
                this.statusRepository.save(this.createStatus("PROGRESS"));
                this.statusRepository.save(this.createStatus("COMPLETE"));
                this.statusRepository.save(this.createStatus("ON HOLD"));
            }
        };
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

}
