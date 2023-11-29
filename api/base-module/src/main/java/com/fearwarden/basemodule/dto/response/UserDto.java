package com.fearwarden.basemodule.dto.response;

import com.fearwarden.basemodule.enums.Role;
import com.fearwarden.basemodule.models.UserEntity;
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
