package com.fearwarden.diaries.tasks.services;

public interface TaskAuthorizationService {
    boolean isOwner(String taskId, String userId);
}
