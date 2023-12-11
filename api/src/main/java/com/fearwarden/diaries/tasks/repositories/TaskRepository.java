package com.fearwarden.diaries.tasks.repositories;

import com.fearwarden.diaries.tasks.models.PriorityEntity;
import com.fearwarden.diaries.tasks.models.StatusEntity;
import com.fearwarden.diaries.tasks.models.TaskEntity;
import com.fearwarden.diaries.users.models.CategoryEntity;
import com.fearwarden.diaries.users.models.UserEntity;
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
