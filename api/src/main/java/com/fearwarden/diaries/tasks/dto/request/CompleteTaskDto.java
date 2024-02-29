package com.fearwarden.diaries.tasks.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CompleteTaskDto {
    @NotNull(message = "Status ID is required.")
    private int statusId;
}
