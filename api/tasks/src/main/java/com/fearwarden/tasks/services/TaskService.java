package com.fearwarden.tasks.services;

import com.fearwarden.tasks.dto.response.TaskDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface TaskService {
    TaskDto createTask(String description, Integer categoryId, Integer priorityId, Integer statusId, UserDetails userDetails);
    List<TaskDto> getAllTasksForUser(UserDetails userDetails);
    TaskDto getTaskById(String id);
}
