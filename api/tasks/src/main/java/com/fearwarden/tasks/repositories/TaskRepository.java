package com.fearwarden.tasks.repositories;

import com.fearwarden.basemodule.models.CategoryEntity;
import com.fearwarden.basemodule.models.UserEntity;
import com.fearwarden.tasks.models.PriorityEntity;
import com.fearwarden.tasks.models.StatusEntity;
import com.fearwarden.tasks.models.TaskEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<TaskEntity, String> {
    Optional<TaskEntity> findById(UUID id);
    Page<TaskEntity> findByUserEntity(UserEntity user, Pageable pageable);
    Page<TaskEntity> findAllByUserEntityAndCategoryEntity(UserEntity user, CategoryEntity category, Pageable pageable);
    Page<TaskEntity> findAllByUserEntityAndStatusEntity(UserEntity user, StatusEntity status, Pageable pageable);
    Page<TaskEntity> findAllByUserEntityAndPriorityEntity(UserEntity user, PriorityEntity priority, Pageable pageable);
}
