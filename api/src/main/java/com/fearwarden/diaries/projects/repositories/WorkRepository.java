package com.fearwarden.diaries.projects.repositories;

import com.fearwarden.diaries.projects.models.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WorkRepository extends JpaRepository<WorkEntity, UUID> {
}