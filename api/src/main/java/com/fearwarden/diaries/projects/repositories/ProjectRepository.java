package com.fearwarden.diaries.projects.repositories;

import com.fearwarden.diaries.projects.models.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProjectRepository extends JpaRepository<ProjectEntity, UUID> {
    ProjectEntity findAllById(UUID id);
}