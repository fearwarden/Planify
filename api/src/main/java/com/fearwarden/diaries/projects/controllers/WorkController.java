package com.fearwarden.diaries.projects.controllers;

import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.dto.request.EditWorkDto;
import com.fearwarden.diaries.projects.dto.request.WorkUpdateStatusAndOrderDto;
import com.fearwarden.diaries.projects.dto.response.WorkDto;
import com.fearwarden.diaries.projects.models.WorkEntity;
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
    public ResponseEntity<WorkDto> createWork(@RequestBody @Validated CreateWorkDto body) {
        return ResponseEntity.ok(workService.createWork(body));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<WorkDto>> getWorksForProject(@PathVariable String projectId) {
        return ResponseEntity.ok(workService.getWorksForProject(projectId));
    }

    @PutMapping("/{workId}")
    public ResponseEntity<Void> editWork(@PathVariable String workId, @RequestBody @Validated EditWorkDto body) {
        workService.editWork(workId, body);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/{workId}/update-status-order")
    public ResponseEntity<Void> updateStatusAndOrder(@PathVariable String workId, @RequestBody @Validated WorkUpdateStatusAndOrderDto body) {
        workService.updateWorkStatusAndOrder(workId, body.getStatusProgress(), body.getWorkOrder());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{workId}")
    public ResponseEntity<Void> deleteWork(@PathVariable String workId) {
        workService.deleteWork(workId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
