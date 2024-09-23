package com.fearwarden.diaries.projects.controllers;

import com.fearwarden.diaries.projects.dto.request.CreateProjectDto;
import com.fearwarden.diaries.projects.dto.response.ProjectDto;
import com.fearwarden.diaries.projects.services.ProjectService;
import com.fearwarden.diaries.users.models.UserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PreAuthorize("hasAnyAuthority('ADMIN', 'PROJECT_MANAGER')")
    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@RequestBody @Valid CreateProjectDto body, @AuthenticationPrincipal UserEntity user) {
        ProjectDto project = projectService.createProject(body.name(), body.employees(), user);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAllProjects(@AuthenticationPrincipal UserEntity user) {
        List<ProjectDto> projects = projectService.getAllProjects(user);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable(name = "projectId") String projectId) {
        ProjectDto project = projectService.getProject(projectId);
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable String projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok("Project successfully deleted.");
    }
}
