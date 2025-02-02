package com.fearwarden.diaries.projects.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.fearwarden.diaries.projects.models.WorkEntity}
 */
public record EditWorkDto(
        @NotNull(message = "Title is required.")
        @NotBlank(message = "Title is required.")
        String title,
        @NotNull(message = "Target date is required.")
        LocalDateTime targetDate,
        @NotNull(message = "Description is required.")
        @NotBlank(message = "Description is required.")
        String description,
        @NotNull(message = "Type ID is required.")
        String typeId,
        @NotNull(message = "Status ID is required.")
        int statusId,
        @NotNull(message = "Assignee ID is required.")
        String assigneeId
) implements Serializable {
}