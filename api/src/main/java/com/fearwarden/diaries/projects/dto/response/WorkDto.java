package com.fearwarden.diaries.projects.dto.response;

import com.fearwarden.diaries.metadata.dto.StatusDto;
import com.fearwarden.diaries.metadata.dto.TypeDto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.projects.models.WorkEntity}
 */
public record WorkDto(UUID id, String title, LocalDate targetDate, String description, LocalDateTime createdAt,
                      TypeDto typeDto,
                      StatusDto statusDto,
                      ProjectMembershipDto assignee) implements Serializable {
}