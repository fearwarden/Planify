package com.fearwarden.tasks.dto.request;

import lombok.Data;

@Data
public class CreateTaskDto {
    private String description;
    private Integer categoryId;
    private Integer priorityId;
    private Integer statusId;
}
