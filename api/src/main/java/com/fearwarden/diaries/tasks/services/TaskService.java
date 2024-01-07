package com.fearwarden.diaries.tasks.services;

import com.fearwarden.diaries.tasks.dto.response.TaskDto;
import com.fearwarden.diaries.users.models.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;

public interface TaskService {
    TaskDto createTask(String description, String due, Integer categoryId, Integer priorityId, Integer statusId, UserEntity userDetails);
    Page<TaskDto> getAllTasksForUser(UserEntity userDetails, Integer page);
    TaskDto getTaskById(String id);
    void updateTask(String id, String description, Integer categoryId, Integer priorityId, Integer statusId);
    void deleteTask(String id);
    Page<TaskDto> getAllTasksForUserByCategory(UserEntity userDetails, Integer categoryId, Integer page);
    Page<TaskDto> getAllTasksForUserByStatus(UserEntity userDetails, Integer statusId, Integer page);
    Page<TaskDto> getAllTasksForUserByPriority(UserEntity userDetails, Integer priorityId, Integer page);
}
