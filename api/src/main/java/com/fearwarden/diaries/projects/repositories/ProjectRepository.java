package com.fearwarden.diaries.projects.repositories;

import com.fearwarden.diaries.projects.models.ProjectEntity;
import com.fearwarden.diaries.projects.models.ProjectMembershipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface ProjectRepository extends JpaRepository<ProjectEntity, UUID> {
    ProjectEntity findAllById(UUID id);
}