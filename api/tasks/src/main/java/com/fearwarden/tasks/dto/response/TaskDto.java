package com.fearwarden.tasks.dto.response;

import com.fearwarden.basemodule.dto.response.UserDto;
import com.fearwarden.basemodule.models.CategoryEntity;
import com.fearwarden.tasks.models.PriorityEntity;
import com.fearwarden.tasks.models.StatusEntity;
import com.fearwarden.tasks.models.TaskEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDto {
    private String id;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String userId;
    private CategoryEntity category;
    private PriorityEntity priority;
    private StatusEntity status;

    public TaskDto(TaskEntity task, String userId, CategoryEntity category, PriorityEntity priority, StatusEntity status) {
        this.id = task.getId().toString();
        this.description = task.getDescription();
        this.createdAt = task.getCreatedAt();
        this.updatedAt = task.getUpdatedAt();
        this.userId = userId;
        this.category = category;
        this.priority = priority;
        this.status = status;
    }
}
