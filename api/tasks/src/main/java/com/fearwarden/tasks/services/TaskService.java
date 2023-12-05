package com.fearwarden.tasks.services;

import com.fearwarden.tasks.dto.response.TaskDto;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetails;

public interface TaskService {
    TaskDto createTask(String description, Integer categoryId, Integer priorityId, Integer statusId, UserDetails userDetails);
    Page<TaskDto> getAllTasksForUser(UserDetails userDetails, Integer page);
    TaskDto getTaskById(String id);
    TaskDto updateTask(String id, String description, Integer categoryId, Integer priorityId, Integer statusId);
    void deleteTask(String id);
}
