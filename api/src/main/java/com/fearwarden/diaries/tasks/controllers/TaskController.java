package com.fearwarden.diaries.tasks.controllers;

import com.fearwarden.diaries.tasks.dto.request.CreateTaskDto;
import com.fearwarden.diaries.tasks.dto.request.UpdateTaskDto;
import com.fearwarden.diaries.tasks.dto.response.TaskDto;
import com.fearwarden.diaries.tasks.dto.response.TaskMetadataDto;
import com.fearwarden.diaries.tasks.services.TaskService;
import com.fearwarden.diaries.tasks.tools.HelperFunctions;
import com.fearwarden.diaries.users.models.UserEntity;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> create(
            @AuthenticationPrincipal UserEntity user,
            @RequestBody @Validated CreateTaskDto body
    ) {
        TaskDto task = this.taskService.createTask(
                body.getDescription(),
                body.getDue(),
                body.getCategoryId(),
                body.getPriorityId(),
                body.getStatusId(),
                user
        );
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<TaskDto>> getAllTasksForUser(
                @AuthenticationPrincipal UserEntity user,
                @RequestParam(name = "page") Integer page
            ) {
        Integer validatePage = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksForUser(user, validatePage);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<TaskDto>> getAllTasksForUserByCategory(
            @AuthenticationPrincipal UserEntity user,
            @PathVariable Integer categoryId,
            @RequestParam(name = "page") Integer page
    ) {
        Integer validatePage = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksForUserByCategory(user, categoryId, validatePage);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/status/{statusId}")
    public ResponseEntity<Page<TaskDto>> getAllTasksForUserByStatus(
            @AuthenticationPrincipal UserEntity user,
            @PathVariable Integer statusId,
            @RequestParam(name = "page") Integer page
            ) {
        Integer validatedPage = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksForUserByStatus(user, statusId, validatedPage);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/priority/{priorityId}")
    public ResponseEntity<Page<TaskDto>> getAllTasksForUserByPriority(
            @AuthenticationPrincipal UserEntity user,
            @PathVariable Integer priorityId,
            @RequestParam(name = "page") Integer page
    ) {
        page = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksForUserByPriority(user, priorityId, page);
        return ResponseEntity.ok(tasks);
    }

    @QueryMapping
    public TaskDto getTaskById(@Argument String id) {
        return this.taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTask(@PathVariable String id, @RequestBody @Validated UpdateTaskDto body) {
        this.taskService
                .updateTask(id, body.getDescription(), body.getCategoryId(), body.getPriorityId(), body.getStatusId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        this.taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/metadata")
    public ResponseEntity<TaskMetadataDto> getMetadata(@AuthenticationPrincipal UserEntity user) {
        TaskMetadataDto metadata = this.taskService.getMetadata(user);
        return ResponseEntity.ok(metadata);
    }
}
