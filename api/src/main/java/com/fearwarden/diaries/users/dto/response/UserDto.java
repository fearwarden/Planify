package com.fearwarden.diaries.users.dto.response;

import com.fearwarden.diaries.users.enums.Role;
import com.fearwarden.diaries.users.models.UserEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime createdAt;
    private Role role;

    public UserDto(UserEntity user) {
        this.id = user.getId().toString();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.createdAt = user.getCreatedAt();
        this.role = user.getRole();
    }
}
