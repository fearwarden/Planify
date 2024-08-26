package com.fearwarden.diaries.projects.dto.response;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.projects.models.ProjectEntity}
 */
public record ProjectDto(UUID id, String name, LocalDateTime createdAt,
                         LocalDateTime updatedAt) implements Serializable {
}