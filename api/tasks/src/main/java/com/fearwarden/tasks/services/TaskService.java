package com.fearwarden.tasks.services;

import com.fearwarden.basemodule.models.UserEntity;

public interface TaskService {
    void create(String description, Integer categoryId, Integer priorityId, Integer statusId, UserEntity user);
}
