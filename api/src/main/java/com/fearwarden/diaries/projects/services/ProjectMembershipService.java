package com.fearwarden.diaries.projects.services;

import com.fearwarden.diaries.projects.dto.response.ProjectMembershipDto;

import java.util.List;

public interface ProjectMembershipService {
    List<ProjectMembershipDto> getMembershipsForProject(String projectId);
}
