package com.fearwarden.diaries.metadata.repositories;

import com.fearwarden.diaries.metadata.models.TypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TypeEntityRepository extends JpaRepository<TypeEntity, UUID> {
}