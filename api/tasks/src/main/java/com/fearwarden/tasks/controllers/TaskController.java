package com.fearwarden.tasks.controllers;

import com.fearwarden.tasks.dto.request.CreateTaskDto;
import com.fearwarden.tasks.dto.response.TaskDto;
import com.fearwarden.tasks.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<TaskDto>> getAllTasksForUser(@AuthenticationPrincipal UserDetails userDetails) {
        List<TaskDto> tasks = this.taskService.getAllTasksForUser(userDetails);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable String id) {
        TaskDto task = this.taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }
}
