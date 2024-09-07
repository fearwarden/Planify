package com.fearwarden.diaries.projects.controllers;

import com.fearwarden.diaries.projects.dto.response.ProjectMembershipDto;
import com.fearwarden.diaries.projects.services.ProjectMembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/memberships")
@RequiredArgsConstructor
public class ProjectMembershipController {
    private final ProjectMembershipService membershipService;

    @GetMapping("/{projectId}")
    public ResponseEntity<List<ProjectMembershipDto>> getMembershipsForProject(@PathVariable String projectId) {
        List<ProjectMembershipDto> memberships = membershipService.getMembershipsForProject(projectId);
        return ResponseEntity.ok(memberships);
    }
}
