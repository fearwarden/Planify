package com.fearwarden.diaries.tasks.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateTaskDto {
    @NotNull(message = "Description is required.")
    @NotBlank(message = "Description should not be blank.")
    @Max(value = 255, message = "Description should be less then 255 characters.")
    private String description;
    @NotNull(message = "Due is required.")
    @NotBlank(message = "Due should not be blank.")
    private String due;
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
