package com.fearwarden.tasks.services.implementations;

import com.fearwarden.basemodule.models.CategoryEntity;
import com.fearwarden.basemodule.models.UserEntity;
import com.fearwarden.basemodule.repositories.CategoryRepository;
import com.fearwarden.basemodule.services.UserService;
import com.fearwarden.tasks.dto.response.TaskDto;
import com.fearwarden.tasks.exceptions.throwables.CategoryNotFoundException;
import com.fearwarden.tasks.exceptions.throwables.PriorityNotFoundException;
import com.fearwarden.tasks.exceptions.throwables.StatusNotFoundException;
import com.fearwarden.tasks.models.PriorityEntity;
import com.fearwarden.tasks.models.StatusEntity;
import com.fearwarden.tasks.models.TaskEntity;
import com.fearwarden.tasks.repositories.PriorityRepository;
import com.fearwarden.tasks.repositories.StatusRepository;
import com.fearwarden.tasks.repositories.TaskRepository;
import com.fearwarden.tasks.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final PriorityRepository priorityRepository;
    private final StatusRepository statusRepository;
    private final CategoryRepository categoryRepository;
    private final UserService userService;

    @Override
    public TaskDto create(String description, Integer categoryId, Integer priorityId, Integer statusId, UserDetails userDetails) {
        UserEntity user = (UserEntity) this.userService.userDetailsService().loadUserByUsername(userDetails.getUsername());
        CategoryEntity category = this.categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        PriorityEntity priority = this.priorityRepository.findById(priorityId).orElseThrow(PriorityNotFoundException::new);
        StatusEntity status = this.statusRepository.findById(statusId).orElseThrow(StatusNotFoundException::new);

        TaskEntity task = new TaskEntity();
        task.setDescription(description);
        task.setCategoryEntity(category);
        task.setPriorityEntity(priority);
        task.setStatusEntity(status);
        task.setUserEntity(user);
        this.taskRepository.save(task);
        return new TaskDto(task, user.getId().toString(), category, priority, status);
    }
}
