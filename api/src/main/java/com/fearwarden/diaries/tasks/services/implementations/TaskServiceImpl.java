package com.fearwarden.diaries.tasks.services.implementations;

import com.fearwarden.diaries.SpecificationBuilder;
import com.fearwarden.diaries.tasks.dto.response.CompleteTaskStatisticsDto;
import com.fearwarden.diaries.tasks.dto.response.TaskDto;
import com.fearwarden.diaries.tasks.dto.response.TaskMetadataDto;
import com.fearwarden.diaries.tasks.dto.response.TaskMetadataMetricsDto;
import com.fearwarden.diaries.tasks.exceptions.throwables.*;
import com.fearwarden.diaries.metadata.models.PriorityEntity;
import com.fearwarden.diaries.metadata.models.StatusEntity;
import com.fearwarden.diaries.tasks.models.TaskEntity;
import com.fearwarden.diaries.metadata.repositories.PriorityRepository;
import com.fearwarden.diaries.metadata.repositories.StatusRepository;
import com.fearwarden.diaries.tasks.repositories.TaskRepository;
import com.fearwarden.diaries.tasks.services.TaskService;
import com.fearwarden.diaries.tasks.specifications.TaskSpecifications;
import com.fearwarden.diaries.tasks.tools.HelperFunctions;
import com.fearwarden.diaries.metadata.models.CategoryEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.metadata.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final PriorityRepository priorityRepository;
    private final StatusRepository statusRepository;
    private final CategoryRepository categoryRepository;

    private final int PAGINATION_SIZE = 10;

    @Override
    public TaskDto createTask(
            String description,
            String due,
            Integer categoryId,
            Integer priorityId,
            Integer statusId,
            UserEntity user
    ) {
        CategoryEntity category =
                this.categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        PriorityEntity priority =
                this.priorityRepository.findById(priorityId).orElseThrow(PriorityNotFoundException::new);
        StatusEntity status =
                this.statusRepository.findById(statusId).orElseThrow(StatusNotFoundException::new);

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
        Pageable pageable =
                PageRequest.of(page - 1, this.PAGINATION_SIZE, Sort.by("due").descending());
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
    public void updateTask(
            String id,
            String description,
            Integer categoryId,
            Integer priorityId,
            Integer statusId, String due
    ) {
        TaskEntity task =
                this.taskRepository.findById(UUID.fromString(id)).orElseThrow(TaskNotFoundException::new);
        CategoryEntity category =
                this.categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        PriorityEntity priority =
                this.priorityRepository.findById(priorityId).orElseThrow(PriorityNotFoundException::new);
        StatusEntity status =
                this.statusRepository.findById(statusId).orElseThrow(StatusNotFoundException::new);

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
    public TaskMetadataDto getMetadata(UserEntity user) {
        List<CategoryEntity> categories = (List<CategoryEntity>) this.categoryRepository.findAll();
        List<PriorityEntity> priorities = (List<PriorityEntity>) this.priorityRepository.findAll();
        List<StatusEntity> status = this.statusRepository.findAll();
        return new TaskMetadataDto(categories, priorities, status);
    }

    @Override
    public Page<TaskDto> getFilteredTasks(String category, String priority, String status, int page) {
        Pageable pageable = PageRequest.of(page - 1, this.PAGINATION_SIZE);
        Specification<TaskEntity> initialSpec = Specification.where(null);
        Specification<TaskEntity> spec = new SpecificationBuilder<>(initialSpec)
                .with(category != null, TaskSpecifications.withCategory(category))
                .with(priority != null, TaskSpecifications.withPriority(priority))
                .with(status != null, TaskSpecifications.withStatus(status))
                .with(true, TaskSpecifications.withPageable(pageable))
                .build();
        Page<TaskEntity> tasks = taskRepository.findAll(spec, pageable);
        List<TaskDto> taskDto = tasks.stream().map(TaskDto::new).toList();
        return new PageImpl<>(taskDto, pageable, tasks.getTotalElements());
    }

    @Override
    public List<TaskDto> searchTasks(String params, UserEntity user) {
        Specification<TaskEntity> initialSpec = Specification.where(null);
        Specification<TaskEntity> spec = new SpecificationBuilder<>(initialSpec)
                .with(params != null, TaskSpecifications.withDescriptionSearch(params, user))
                .build();
        List<TaskEntity> tasks = taskRepository.findAll(spec);
        log.info("Tasks successfully fetched: {}", tasks);
        return tasks.stream().map(TaskDto::new).toList();
    }

    @Override
    public void completeTask(String id) {
        StatusEntity status = statusRepository.findCompleteStatus();
        if (status == null) {
            throw new InvalidCompleteStatusException();
        }
        TaskEntity task = taskRepository.findById(UUID.fromString(id)).orElseThrow(TaskNotFoundException::new);
        task.setStatusEntity(status);
        taskRepository.save(task);
    }

    @Override
    public TaskMetadataMetricsDto countTasksByMetadata(UserEntity user) {
        List<Object[]> countStatus = taskRepository.countTaskEntitiesByStatusEntity(user.getId());
        List<Object[]> countPriorities = taskRepository.countTaskEntitiesByPriorityEntity(user.getId());
        List<Object[]> countCategories = taskRepository.countTaskEntitiesByCategoryEntity(user.getId());
        Map<String, Long> statusMetrics = new HashMap<>();
        Map<String, Long> priorityMetrics = new HashMap<>();
        Map<String, Long> categoryMetrics = new HashMap<>();
        for (Object[] row : countStatus) {
            statusMetrics.put(row[0].toString(), (Long) row[1]);
        }
        for (Object[] row : countPriorities) {
            priorityMetrics.put(row[0].toString(), (Long) row[1]);
        }
        for (Object[] row : countCategories) {
            categoryMetrics.put(row[0].toString(), (Long) row[1]);
        }
        return new TaskMetadataMetricsDto(statusMetrics, priorityMetrics, categoryMetrics);
    }

    @Override
    public CompleteTaskStatisticsDto completeTaskStatistics(UserEntity user) {
        long totalNumberOfTasks = taskRepository.countAllByUserEntity(user);
        StatusEntity completeStatus = statusRepository.findCompleteStatus();
        long completedTasks = taskRepository.countByStatusEntityAndUserEntity(completeStatus, user);
        return new CompleteTaskStatisticsDto(completedTasks, totalNumberOfTasks);
    }
}
