package com.fearwarden.diaries.projects.dto.response;

import com.fearwarden.diaries.projects.enums.ProjectRole;
import com.fearwarden.diaries.users.dto.response.UserDto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.projects.models.ProjectMembershipEntity}
 */
public record ProjectMembershipDto(UUID id, ProjectRole projectRole, LocalDateTime joinedAt,
                                   UserDto userDto,
                                   ProjectDto projectDto) implements Serializable {
}