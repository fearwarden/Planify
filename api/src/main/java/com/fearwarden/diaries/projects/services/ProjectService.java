package com.fearwarden.diaries.projects.services;

import com.fearwarden.diaries.projects.dto.response.ProjectDto;
import com.fearwarden.diaries.users.dto.response.UserDto;
import com.fearwarden.diaries.users.models.UserEntity;

import java.util.List;

public interface ProjectService {
    ProjectDto createProject(String name, List<UserDto> members, UserEntity user);
    List<ProjectDto> getAllProjects(UserEntity user);
}
