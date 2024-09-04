package com.fearwarden.diaries.projects.dto.response;

import com.fearwarden.diaries.projects.enums.ProjectStatus;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.projects.models.ProjectEntity}
 */
public record ProjectDto(UUID id, String name, LocalDateTime createdAt,
                         LocalDateTime updatedAt, String iconPath, ProjectStatus status, String url) implements Serializable {
    public ProjectDto withIconPath(String iconPath) {
        return new ProjectDto(id, name, createdAt, updatedAt, iconPath, status, url);
    }
}