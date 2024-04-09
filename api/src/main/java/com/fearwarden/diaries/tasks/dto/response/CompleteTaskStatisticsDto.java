package com.fearwarden.diaries.tasks.dto.response;

import lombok.Data;

@Data
public class CompleteTaskStatisticsDto {
    private long completedTasks;
    private long totalNumberOfTasks;

    public CompleteTaskStatisticsDto(long completedTasks, long totalNumberOfTasks) {
        this.completedTasks = completedTasks;
        this.totalNumberOfTasks = totalNumberOfTasks;
    }
}
