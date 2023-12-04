package com.fearwarden.tasks.services;

import com.fearwarden.basemodule.models.UserEntity;
import com.fearwarden.tasks.dto.response.TaskDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface TaskService {
    TaskDto create(String description, Integer categoryId, Integer priorityId, Integer statusId, UserDetails userDetails);
}
