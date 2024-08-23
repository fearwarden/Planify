package com.fearwarden.diaries.tasks.repositories;

import com.fearwarden.diaries.metadata.models.StatusEntity;
import com.fearwarden.diaries.tasks.models.TaskEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<TaskEntity, UUID>, JpaSpecificationExecutor<TaskEntity> {
    Page<TaskEntity> findByUserEntityOrderByDueDesc(UserEntity user, Pageable pageable);
    @Query("SELECT t.statusEntity.progress, COUNT(t) FROM TaskEntity t WHERE t.userEntity.id = :userId GROUP BY t.statusEntity.id")
    List<Object[]> countTaskEntitiesByStatusEntity(@Param("userId") UUID userId);
    @Query("SELECT t.priorityEntity.level, COUNT(t) from TaskEntity t WHERE t.userEntity.id = :userId GROUP BY t.priorityEntity.id")
    List<Object[]> countTaskEntitiesByPriorityEntity(@Param("userId") UUID userId);
    @Query("SELECT t.categoryEntity.name, COUNT(t) from TaskEntity t WHERE t.userEntity.id = :userId GROUP BY t.categoryEntity.id")
    List<Object[]> countTaskEntitiesByCategoryEntity(@Param("userId") UUID userId);
    long countAllByUserEntity(UserEntity user);
    long countByStatusEntityAndUserEntity(StatusEntity statusEntity, UserEntity user);
}

