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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> create(@RequestBody @Validated CreateTaskDto body, @AuthenticationPrincipal UserDetails userDetails) {
        TaskDto task = this.taskService.create(
                body.getDescription(),
                body.getCategoryId(),
                body.getPriorityId(),
                body.getStatusId(),
                userDetails
        );
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }
}
