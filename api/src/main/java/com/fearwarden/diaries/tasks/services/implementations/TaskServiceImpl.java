package com.fearwarden.diaries.tasks.services.implementations;

import com.fearwarden.diaries.tasks.dto.response.TaskDto;
import com.fearwarden.diaries.tasks.dto.response.TaskMetadataDto;
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
import com.fearwarden.diaries.tasks.tools.HelperFunctions;
import com.fearwarden.diaries.users.models.CategoryEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.repositories.CategoryRepository;
import com.fearwarden.diaries.users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
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
    public TaskDto createTask(
            String description,
            String due,
            Integer categoryId,
            Integer priorityId,
            Integer statusId,
            UserEntity user
    ) {
        CategoryEntity category = this.categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        PriorityEntity priority = this.priorityRepository.findById(priorityId).orElseThrow(PriorityNotFoundException::new);
        StatusEntity status = this.statusRepository.findById(statusId).orElseThrow(StatusNotFoundException::new);

        LocalDateTime dueConverted = HelperFunctions.convertStringToLocalDateTime(due);

        TaskEntity task = new TaskEntity();
        task.setDescription(description);
        task.setDue(dueConverted);
        task.setCategoryEntity(category);
        task.setPriorityEntity(priority);
        task.setStatusEntity(status);
        task.setUserEntity(user);
        this.taskRepository.save(task);
        return new TaskDto(task);
    }

    @Override
    public Page<TaskDto> getAllTasksForUser(UserEntity user, Integer page) {
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE, Sort.by("due").descending());
        Page<TaskEntity> taskEntities = this.taskRepository.findByUserEntityOrderByDueDesc(user, pageable);
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
    public void updateTask(String id, String description, Integer categoryId, Integer priorityId, Integer statusId, String due) {
        TaskEntity task = this.taskRepository.findById(UUID.fromString(id)).orElseThrow(TaskNotFoundException::new);
        CategoryEntity category = this.categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        PriorityEntity priority = this.priorityRepository.findById(priorityId).orElseThrow(PriorityNotFoundException::new);
        StatusEntity status = this.statusRepository.findById(statusId).orElseThrow(StatusNotFoundException::new);

        task.setDescription(description);
        task.setDue(HelperFunctions.convertStringToLocalDateTime(due));
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
    public Page<TaskDto> getAllTasksForUserByCategory(UserEntity user, Integer categoryId, Integer page) {
        CategoryEntity category =
                this.categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE);
        Page<TaskEntity> tasks =
                this.taskRepository.findAllByUserEntityAndCategoryEntityOrderByDueDesc(user, category, pageable);
        List<TaskDto> taskDtos = tasks.stream().map(TaskDto::new).toList();
        return new PageImpl<>(taskDtos, pageable, tasks.getTotalElements());
    }

    @Override
    public Page<TaskDto> getAllTasksForUserByStatus(UserEntity user, Integer statusId, Integer page) {
        StatusEntity status = this.statusRepository.findById(statusId).orElseThrow(StatusNotFoundException::new);
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE);
        Page<TaskEntity> tasks =
                this.taskRepository.findAllByUserEntityAndStatusEntityOrderByDueDesc(user, status, pageable);
        List<TaskDto> taskDtos = tasks.stream().map(TaskDto::new).toList();
        return new PageImpl<>(taskDtos, pageable, tasks.getTotalElements());
    }

    @Override
    public Page<TaskDto> getAllTasksForUserByPriority(UserEntity user, Integer priorityId, Integer page) {
        PriorityEntity priority = this.priorityRepository.findById(priorityId).orElseThrow(PriorityNotFoundException::new);
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE);
        Page<TaskEntity> taskEntities =
                this.taskRepository.findAllByUserEntityAndPriorityEntityOrderByDueDesc(user, priority, pageable);
        List<TaskDto> taskDtos = taskEntities.stream().map(TaskDto::new).toList();
        return new PageImpl<>(taskDtos, pageable, taskEntities.getTotalElements());
    }

    @Override
    public TaskMetadataDto getMetadata(UserEntity user) {
        List<CategoryEntity> categories = (List<CategoryEntity>) this.categoryRepository.findAll();
        List<PriorityEntity> priorities = (List<PriorityEntity>) this.priorityRepository.findAll();
        List<StatusEntity> status = (List<StatusEntity>) this.statusRepository.findAll();
        return new TaskMetadataDto(categories, priorities, status);
    }
}
