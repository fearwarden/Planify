package com.fearwarden.diaries.tasks.services;

import com.fearwarden.diaries.tasks.dto.response.TaskDto;
import com.fearwarden.diaries.tasks.dto.response.TaskMetadataDto;
import com.fearwarden.diaries.tasks.dto.response.TaskMetadataMetricsDto;
import com.fearwarden.diaries.users.models.UserEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TaskService {
    TaskDto createTask(String description, String due, Integer categoryId, Integer priorityId, Integer statusId, UserEntity userDetails);
    Page<TaskDto> getAllTasksForUser(UserEntity userDetails, Integer page);
    TaskDto getTaskById(String id);
    void updateTask(String id, String description, Integer categoryId, Integer priorityId, Integer statusId, String due);
    void deleteTask(String id);
    TaskMetadataDto getMetadata(UserEntity user);
    Page<TaskDto> getFilteredTasks(String category, String priority, String status, int page);
    List<TaskDto> searchTasks(String params, UserEntity user);
    void completeTask(String id);
    TaskMetadataMetricsDto countTasksByMetadata(UserEntity user);
}
