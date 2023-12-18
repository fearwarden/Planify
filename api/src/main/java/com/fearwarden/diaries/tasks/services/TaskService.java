package com.fearwarden.diaries.tasks.services;

import com.fearwarden.diaries.tasks.dto.response.TaskDto;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;

public interface TaskService {
    TaskDto createTask(String description, String due, Integer categoryId, Integer priorityId, Integer statusId, UserDetails userDetails);
    Page<TaskDto> getAllTasksForUser(UserDetails userDetails, Integer page);
    TaskDto getTaskById(String id);
    void updateTask(String id, String description, Integer categoryId, Integer priorityId, Integer statusId);
    void deleteTask(String id);
    Page<TaskDto> getAllTasksForUserByCategory(UserDetails userDetails, Integer categoryId, Integer page);
    Page<TaskDto> getAllTasksForUserByStatus(UserDetails userDetails, Integer statusId, Integer page);
    Page<TaskDto> getAllTasksForUserByPriority(UserDetails userDetails, Integer priorityId, Integer page);
}
