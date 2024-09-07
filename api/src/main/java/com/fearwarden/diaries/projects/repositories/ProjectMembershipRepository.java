package com.fearwarden.diaries.projects.repositories;

import com.fearwarden.diaries.projects.models.ProjectEntity;
import com.fearwarden.diaries.projects.models.ProjectMembershipEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;
import java.util.UUID;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembershipEntity, UUID> {
    Set<ProjectMembershipEntity> findAllByUserEntity(UserEntity user);
    Set<ProjectMembershipEntity> findAllByProjectEntity(ProjectEntity project);
    ProjectMembershipEntity findByProjectEntityAndUserEntity(ProjectEntity project, UserEntity user);
}