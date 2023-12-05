package com.fearwarden.tasks.controllers;

import com.fearwarden.tasks.dto.request.CreateTaskDto;
import com.fearwarden.tasks.dto.request.UpdateTaskDto;
import com.fearwarden.tasks.dto.response.TaskDto;
import com.fearwarden.tasks.services.TaskService;
import com.fearwarden.tasks.tools.HelperFunctions;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<TaskDto> create(@RequestBody @Validated CreateTaskDto body, @AuthenticationPrincipal UserDetails userDetails) {
        TaskDto task = this.taskService.createTask(
                body.getDescription(),
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
    public ResponseEntity<Page<TaskDto>> getAllTasksByCategory(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer categoryId,
            @RequestParam(name = "page") Integer page
    ) {
        System.out.println(categoryId);
        Integer validatePage = HelperFunctions.validatePage(page);
        Page<TaskDto> tasks = this.taskService.getAllTasksByCategory(userDetails, categoryId, validatePage);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable String id) {
        TaskDto task = this.taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTask(@PathVariable String id, @RequestBody @Validated UpdateTaskDto body) {
        TaskDto task = this.taskService
                .updateTask(id, body.getDescription(), body.getCategoryId(), body.getPriorityId(), body.getStatusId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        this.taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
