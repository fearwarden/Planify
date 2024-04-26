package com.fearwarden.diaries.tasks.dto.response;

import com.fearwarden.diaries.tasks.models.TaskEntity;
import com.fearwarden.diaries.tasks.tools.HelperFunctions;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDto {
    private String id;
    private String description;
    private String due;
    private String createdAt;
    private String updatedAt;
    private String userId;
    private String category;
    private String priority;
    private String status;

    public TaskDto(TaskEntity task) {
        this.id = task.getId().toString();
        this.description = task.getDescription();
        this.due = HelperFunctions.convertDateToString(task.getDue());
        this.createdAt = HelperFunctions.convertDateToString(task.getCreatedAt());
        this.updatedAt = HelperFunctions.convertDateToString(task.getUpdatedAt());
        this.userId = task.getUserEntity().getId().toString();
        this.category = task.getCategoryEntity().getName();
        this.priority = task.getPriorityEntity().getLevel();
        this.status = task.getStatusEntity().getProgress();
    }
}
