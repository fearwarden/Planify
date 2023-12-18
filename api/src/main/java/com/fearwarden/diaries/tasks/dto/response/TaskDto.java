package com.fearwarden.diaries.tasks.dto.response;

import com.fearwarden.diaries.tasks.models.TaskEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDto {
    private String id;
    private String description;
    private LocalDateTime due;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String userId;
    private Integer categoryId;
    private Integer priorityId;
    private Integer statusId;

    public TaskDto(TaskEntity task) {
        this.id = task.getId().toString();
        this.description = task.getDescription();
        this.due = task.getDue();
        this.createdAt = task.getCreatedAt();
        this.updatedAt = task.getUpdatedAt();
        this.userId = task.getUserEntity().getId().toString();
        this.categoryId = task.getCategoryEntity().getId();
        this.priorityId = task.getPriorityEntity().getId();
        this.statusId = task.getStatusEntity().getId();
    }
}
