package com.fearwarden.diaries.projects.repositories;

import com.fearwarden.diaries.projects.models.ProjectMembershipEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembershipEntity, UUID> {
}