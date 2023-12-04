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

    public TaskDto(TaskEntity task) {
        this.id = task.getId().toString();
        this.description = task.getDescription();
        this.createdAt = task.getCreatedAt();
        this.updatedAt = task.getUpdatedAt();
        this.userId = task.getUserEntity().getId().toString();
        this.category = task.getCategoryEntity();
        this.priority = task.getPriorityEntity();
        this.status = task.getStatusEntity();
    }
}
