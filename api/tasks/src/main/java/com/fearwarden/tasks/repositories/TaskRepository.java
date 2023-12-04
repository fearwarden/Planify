package com.fearwarden.tasks.repositories;

import com.fearwarden.basemodule.models.UserEntity;
import com.fearwarden.tasks.models.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity, String> {
    List<TaskEntity> findByUserEntity(UserEntity user);
}
