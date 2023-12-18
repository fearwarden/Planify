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
    Page<TaskEntity> findByUserEntityOrderByDueDesc(UserEntity user, Pageable pageable);
    Page<TaskEntity> findAllByUserEntityAndCategoryEntityOrderByDueDesc(UserEntity user, CategoryEntity category, Pageable pageable);
    Page<TaskEntity> findAllByUserEntityAndStatusEntityOrderByDueDesc(UserEntity user, StatusEntity status, Pageable pageable);
    Page<TaskEntity> findAllByUserEntityAndPriorityEntityOrderByDueDesc(UserEntity user, PriorityEntity priority, Pageable pageable);
}
