package com.fearwarden.diaries.tasks.dto.response;

import lombok.Data;

import java.util.Map;

@Data
public class TaskMetadataMetricsDto {
    private Map<String, Long> statusMetrics;
    private Map<String, Long> priorityMetrics;
    private Map<String, Long> categoryMetrics;

    public TaskMetadataMetricsDto(
            Map<String, Long> statusMetrics,
            Map<String, Long> priorityMetrics,
            Map<String, Long> categoryMetrics
            ) {
        this.statusMetrics = statusMetrics;
        this.priorityMetrics = priorityMetrics;
        this.categoryMetrics = categoryMetrics;
    }
}
