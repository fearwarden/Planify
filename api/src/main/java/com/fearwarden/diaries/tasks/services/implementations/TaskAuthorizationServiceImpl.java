package com.fearwarden.diaries.tasks.services.implementations;

import com.fearwarden.diaries.auth.exceptions.throwables.ForbiddenException;
import com.fearwarden.diaries.tasks.exceptions.throwables.TaskNotFoundException;
import com.fearwarden.diaries.tasks.models.TaskEntity;
import com.fearwarden.diaries.tasks.repositories.TaskRepository;
import com.fearwarden.diaries.tasks.services.TaskAuthorizationService;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("taskAuthorizationService")
@RequiredArgsConstructor
public class TaskAuthorizationServiceImpl implements TaskAuthorizationService {
    private final TaskRepository taskRepository;
    private final UserService userService;
    @Override
    public boolean isOwner(String taskId, String username) {
        UserEntity details = (UserEntity) userService.userDetailsService().loadUserByUsername(username);
        TaskEntity task = this.taskRepository.findById(UUID.fromString(taskId))
                .orElseThrow(TaskNotFoundException::new);
        if (!task.getUserEntity().getId().equals(details.getId())) throw new ForbiddenException();
        return true;
    }
}
