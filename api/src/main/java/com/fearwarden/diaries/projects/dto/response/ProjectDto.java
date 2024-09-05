package com.fearwarden.diaries.projects.dto.response;

import com.fearwarden.diaries.projects.enums.ProjectStatus;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.projects.models.ProjectEntity}
 */
public record ProjectDto(UUID id, String name, String createdAt,
                         String updatedAt, String iconPath, ProjectStatus status, String url) implements Serializable {
    public ProjectDto withIconPathAndDate(String iconPath, String createdAt, String updatedAt) {
        return new ProjectDto(id, name, createdAt, updatedAt, iconPath, status, url);
    }
}