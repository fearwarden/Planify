package com.fearwarden.diaries.projects.dto.request;

import com.fearwarden.diaries.metadata.dto.StatusDto;
import com.fearwarden.diaries.metadata.dto.TypeDto;
import com.fearwarden.diaries.users.dto.response.UserDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateWorkDto(
        @NotNull(message = "Title is required.")
        @NotBlank(message = "Title is required.")
        String title,
        @NotNull(message = "Due date is required.")
        @NotBlank(message = "Due date is required.")
        String targetDate,
        @NotNull(message = "Description is required.")
        @NotBlank(message = "Description is required.")
        String description,
        @NotNull(message = "Project ID is required.")
        @NotBlank(message = "Project ID is required.")
        String projectId,
        @NotNull(message = "Type is required.")
        TypeDto type,
        @NotNull(message = "Status is required.")
        StatusDto status,
        @NotNull(message = "Type is required.")
        UserDto user
) {}

