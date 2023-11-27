package com.fearwarden.tasks.repositories;

import com.fearwarden.tasks.models.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskEntity, String> {
}
