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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

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

    @QueryMapping
    public TaskDto getTaskById(@Argument String id) {
        return this.taskService.getTaskById(id);
    }

    @PreAuthorize("@taskAuthorizationService.isOwner(#id, principal.username) or hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTask(@PathVariable String id, @RequestBody @Validated UpdateTaskDto body) {
        this.taskService
                .updateTask(
                        id, body.getDescription(),
                        body.getCategoryId(),
                        body.getPriorityId(),
                        body.getStatusId(),
                        body.getDue()
                );
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@taskAuthorizationService.isOwner(#id, principal.username) or hasAuthority('ADMIN')")
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

    @GetMapping("/filter")
    public ResponseEntity<Page<TaskDto>> filterTasks(
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "priority", required = false) String priority,
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "page") int page
    ) {
        int validatedPage = HelperFunctions.validatePage(page);
        Page<TaskDto> filteredTasks = taskService.getFilteredTasks(category, priority, status, validatedPage);
        return ResponseEntity.ok(filteredTasks);
    }
}
