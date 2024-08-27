package com.fearwarden.diaries.tasks.dto.response;

import com.fearwarden.diaries.metadata.models.CategoryEntity;
import com.fearwarden.diaries.metadata.models.PriorityEntity;
import com.fearwarden.diaries.metadata.models.StatusEntity;
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
    private CategoryEntity category;
    private PriorityEntity priority;
    private StatusEntity status;

    public TaskDto(TaskEntity task) {
        this.id = task.getId().toString();
        this.description = task.getDescription();
        this.due = HelperFunctions.convertDateToString(task.getDue());
        this.createdAt = HelperFunctions.convertDateToString(task.getCreatedAt());
        this.updatedAt = HelperFunctions.convertDateToString(task.getUpdatedAt());
        this.userId = task.getUserEntity().getId().toString();
        this.category = task.getCategoryEntity();
        this.priority = task.getPriorityEntity();
        this.status = task.getStatusEntity();
    }
}
