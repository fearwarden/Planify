package com.fearwarden.diaries.tasks.dto.response;

import com.fearwarden.diaries.tasks.models.PriorityEntity;
import com.fearwarden.diaries.tasks.models.StatusEntity;
import com.fearwarden.diaries.users.models.CategoryEntity;
import lombok.Data;

import java.util.List;

@Data
public class TaskMetadataDto {
    private List<CategoryEntity> categories;
    private List<PriorityEntity> priorities;
    private List<StatusEntity> status;

    public TaskMetadataDto(List<CategoryEntity> categories, List<PriorityEntity> priorities, List<StatusEntity> status) {
        this.categories = categories;
        this.priorities = priorities;
        this.status = status;
    }
}
