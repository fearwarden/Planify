package com.fearwarden.diaries.projects.dto.response;

import com.fearwarden.diaries.projects.enums.ProjectRole;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.projects.models.WorkEntity}
 */
@Value
public class WorkDto implements Serializable {
    UUID id;
    String title;
    LocalDateTime targetDate;
    String description;
    LocalDateTime createdAt;
    TypeEntityDto typeEntity;
    StatusEntityDto statusEntity;
    ProjectMembershipEntityDto assignee;

    /**
     * DTO for {@link com.fearwarden.diaries.metadata.models.TypeEntity}
     */
    @Value
    public static class TypeEntityDto implements Serializable {
        UUID id;
        String type;
    }

    /**
     * DTO for {@link com.fearwarden.diaries.metadata.models.StatusEntity}
     */
    @Value
    public static class StatusEntityDto implements Serializable {
        Integer id;
        String progress;
    }

    /**
     * DTO for {@link com.fearwarden.diaries.projects.models.ProjectMembershipEntity}
     */
    @Value
    public static class ProjectMembershipEntityDto implements Serializable {
        UUID id;
        ProjectRole projectRole;
        LocalDateTime joinedAt;
        UserEntityDto userEntity;

        /**
         * DTO for {@link com.fearwarden.diaries.users.models.UserEntity}
         */
        @Value
        public static class UserEntityDto implements Serializable {
            UUID id;
            String email;
            String firstName;
            String lastName;
        }
    }
}