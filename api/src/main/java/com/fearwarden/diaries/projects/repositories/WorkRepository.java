package com.fearwarden.diaries.projects.repositories;

import com.fearwarden.diaries.metadata.models.StatusEntity;
import com.fearwarden.diaries.projects.models.ProjectEntity;
import com.fearwarden.diaries.projects.models.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface WorkRepository extends JpaRepository<WorkEntity, UUID> {
    List<WorkEntity> findAllByProjectEntityOrderByStatusEntityAscWorkOrderAsc(ProjectEntity project);
    List<WorkEntity> findAllByStatusEntity(StatusEntity status);
    @Query("SELECT MAX(w.workOrder) from WorkEntity w where w.statusEntity = :status")
    int maximumWorkOrder(StatusEntity status);
}