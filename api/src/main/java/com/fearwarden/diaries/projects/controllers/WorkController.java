package com.fearwarden.diaries.projects.controllers;

import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.dto.request.EditWorkDto;
import com.fearwarden.diaries.projects.dto.response.WorkDto;
import com.fearwarden.diaries.projects.services.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/works")
@RequiredArgsConstructor
public class WorkController {
    private final WorkService workService;

    @PostMapping
    public ResponseEntity<Void> createWork(@RequestBody @Validated CreateWorkDto body) {
        WorkDto work = workService.createWork(body);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<WorkDto>> getWorksForProject(@PathVariable String projectId) {
        List<WorkDto> works = workService.getWorksForProject(projectId);
        return ResponseEntity.ok(works);
    }

    @PutMapping("/{workId}")
    public ResponseEntity<Void> editWork(@PathVariable String workId, @RequestBody @Validated EditWorkDto body) {
        workService.editWork(workId, body);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
