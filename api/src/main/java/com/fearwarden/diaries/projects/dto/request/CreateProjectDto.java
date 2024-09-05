package com.fearwarden.diaries.projects.dto.request;

import com.fearwarden.diaries.users.dto.response.UserDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.fearwarden.diaries.projects.models.ProjectEntity}
 */
public record CreateProjectDto(
        @NotNull(message = "Name is required")
        @NotBlank(message = "Name is required")
        String name,
        List<UserDto> employees
) implements Serializable {
}