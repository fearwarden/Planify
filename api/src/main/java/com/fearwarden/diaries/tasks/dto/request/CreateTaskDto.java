package com.fearwarden.diaries.tasks.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTaskDto {
    @NotNull(message = "Description is required.")
    @NotBlank(message = "Description should not be blank.")
    private String description;
    @NotNull(message = "Category ID is required.")
    @Min(0)
    private Integer categoryId;
    @NotNull(message = "Priority ID is required.")
    @Min(0)
    private Integer priorityId;
    @NotNull(message = "Status ID is required.")
    @Min(0)
    private Integer statusId;
}
