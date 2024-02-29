package com.fearwarden.diaries.tasks.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UpdateTaskDto {
    @NotNull(message = "Description is required.")
    @NotBlank(message = "Description should not be blank.")
    @Size(max = 255, message = "Description must be less than 255 characters.")
    private String description;
    @NotNull(message = "Due is required.")
    @NotBlank(message = "Due should not be blank.")
    private String due;
    @NotNull(message = "Category ID is required.")
    @Min(1)
    private Integer categoryId;
    @NotNull(message = "Priority ID is required.")
    @Min(1)
    private Integer priorityId;
    @NotNull(message = "Status ID is required.")
    @Min(1)
    private Integer statusId;
}
