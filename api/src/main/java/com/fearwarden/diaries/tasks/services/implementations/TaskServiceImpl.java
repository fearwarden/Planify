package com.fearwarden.diaries.tasks.services.implementations;

import com.fearwarden.diaries.tasks.dto.response.TaskDto;
import com.fearwarden.diaries.tasks.exceptions.throwables.CategoryNotFoundException;
import com.fearwarden.diaries.tasks.exceptions.throwables.PriorityNotFoundException;
import com.fearwarden.diaries.tasks.exceptions.throwables.StatusNotFoundException;
import com.fearwarden.diaries.tasks.exceptions.throwables.TaskNotFoundException;
import com.fearwarden.diaries.tasks.models.PriorityEntity;
import com.fearwarden.diaries.tasks.models.StatusEntity;
import com.fearwarden.diaries.tasks.models.TaskEntity;
import com.fearwarden.diaries.tasks.repositories.PriorityRepository;
import com.fearwarden.diaries.tasks.repositories.StatusRepository;
import com.fearwarden.diaries.tasks.repositories.TaskRepository;
import com.fearwarden.diaries.tasks.services.TaskService;
import com.fearwarden.diaries.users.models.CategoryEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.repositories.CategoryRepository;
import com.fearwarden.diaries.users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final PriorityRepository priorityRepository;
    private final StatusRepository statusRepository;
    private final CategoryRepository categoryRepository;
    private final UserService userService;

    private final Integer PAGINATION_SIZE = 10;

    @Override
    public TaskDto createTask(String description, Integer categoryId, Integer priorityId, Integer statusId, UserDetails userDetails) {
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
        return new TaskDto(task);
    }

    @Override
    public Page<TaskDto> getAllTasksForUser(UserDetails userDetails, Integer page) {
        UserEntity user = (UserEntity) this.userService.userDetailsService().loadUserByUsername(userDetails.getUsername());
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE);
        Page<TaskEntity> taskEntities = this.taskRepository.findByUserEntityOrderByCreatedAtDesc(user, pageable);
        List<TaskDto> taskDtos = taskEntities.stream()
                .map(TaskDto::new)
                .toList();
        return new PageImpl<>(taskDtos, pageable, taskEntities.getTotalElements());
    }

    @Override
    public TaskDto getTaskById(String id) {
        TaskEntity task = this.taskRepository.findById(UUID.fromString(id)).orElseThrow(TaskNotFoundException::new);
        return new TaskDto(task);
    }

    @Override
    public void updateTask(String id, String description, Integer categoryId, Integer priorityId, Integer statusId) {
        TaskEntity task = this.taskRepository.findById(UUID.fromString(id)).orElseThrow(TaskNotFoundException::new);
        CategoryEntity category = this.categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        PriorityEntity priority = this.priorityRepository.findById(priorityId).orElseThrow(PriorityNotFoundException::new);
        StatusEntity status = this.statusRepository.findById(statusId).orElseThrow(StatusNotFoundException::new);

        task.setDescription(description);
        task.setCategoryEntity(category);
        task.setPriorityEntity(priority);
        task.setStatusEntity(status);
        task.setUpdatedAt(LocalDateTime.now());
        this.taskRepository.saveAndFlush(task);
    }

    @Override
    public void deleteTask(String id) {
        TaskEntity task = this.taskRepository.findById(UUID.fromString(id)).orElseThrow(TaskNotFoundException::new);
        this.taskRepository.delete(task);
    }

    @Override
    public Page<TaskDto> getAllTasksForUserByCategory(UserDetails userDetails, Integer categoryId, Integer page) {
        UserEntity user = (UserEntity) this.userService.userDetailsService().loadUserByUsername(userDetails.getUsername());
        CategoryEntity category = this.categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE);
        Page<TaskEntity> tasks = this.taskRepository.findAllByUserEntityAndCategoryEntityOrderByCreatedAtDesc(user, category, pageable);
        List<TaskDto> taskDtos = tasks.stream().map(TaskDto::new).toList();
        return new PageImpl<>(taskDtos, pageable, tasks.getTotalElements());
    }

    @Override
    public Page<TaskDto> getAllTasksForUserByStatus(UserDetails userDetails, Integer statusId, Integer page) {
        UserEntity user = (UserEntity) this.userService.userDetailsService().loadUserByUsername(userDetails.getUsername());
        StatusEntity status = this.statusRepository.findById(statusId).orElseThrow(StatusNotFoundException::new);
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE);
        Page<TaskEntity> tasks = this.taskRepository.findAllByUserEntityAndStatusEntityOrderByCreatedAtDesc(user, status, pageable);
        List<TaskDto> taskDtos = tasks.stream().map(TaskDto::new).toList();
        return new PageImpl<>(taskDtos, pageable, tasks.getTotalElements());
    }

    @Override
    public Page<TaskDto> getAllTasksForUserByPriority(UserDetails userDetails, Integer priorityId, Integer page) {
        UserEntity user = (UserEntity) this.userService.userDetailsService().loadUserByUsername(userDetails.getUsername());
        PriorityEntity priority = this.priorityRepository.findById(priorityId).orElseThrow(PriorityNotFoundException::new);
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE);
        Page<TaskEntity> taskEntities = this.taskRepository.findAllByUserEntityAndPriorityEntityOrderByCreatedAtDesc(user, priority, pageable);
        List<TaskDto> taskDtos = taskEntities.stream().map(TaskDto::new).toList();
        return new PageImpl<>(taskDtos, pageable, taskEntities.getTotalElements());
    }
}
