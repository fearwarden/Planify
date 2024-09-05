package com.fearwarden.diaries.users.dto.response;

import com.fearwarden.diaries.users.enums.Role;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.users.models.UserEntity}
 */
public record UserDto(UUID id, String email, String firstName, String lastName,
                      Role role) implements Serializable {
}