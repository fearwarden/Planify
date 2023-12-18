package com.fearwarden.diaries.tasks.controllers;

import com.fearwarden.diaries.tasks.dto.request.CreateTaskDto;
import com.fearwarden.diaries.tasks.dto.request.UpdateTaskDto;
import com.fearwarden.diaries.tasks.dto.response.TaskDto;
import com.fearwarden.diaries.tasks.services.TaskService;
import com.fearwarden.diaries.tasks.tools.HelperFunctions;
import lombok.RequiredArgsConstructor;
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
            @RequestBody @Validated CreateTaskDto body,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        TaskDto task = this.taskService.createTask(
                body.getDescription(),
                body.getDue(),
                body.getCategoryId(),
                body.getPriorityId(),
                body.getStatusId(),
                userDetails
        );
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<TaskDto>> getAllTasksForUser(
                @AuthenticationPrincipal UserDetails userDetails,
                @RequestParam(name = "page") Integer page
            ) {
        Integer validatePage = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksForUser(userDetails, validatePage);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<TaskDto>> getAllTasksForUserByCategory(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer categoryId,
            @RequestParam(name = "page") Integer page
    ) {
        Integer validatePage = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksForUserByCategory(userDetails, categoryId, validatePage);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/status/{statusId}")
    public ResponseEntity<Page<TaskDto>> getAllTasksForUserByStatus(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer statusId,
            @RequestParam(name = "page") Integer page
            ) {
        Integer validatedPage = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksForUserByStatus(userDetails, statusId, validatedPage);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/priority/{priorityId}")
    public ResponseEntity<Page<TaskDto>> getAllTasksForUserByPriority(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer priorityId,
            @RequestParam(name = "page") Integer page
    ) {
        page = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksForUserByPriority(userDetails, priorityId, page);
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
}
