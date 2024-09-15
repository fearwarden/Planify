package com.fearwarden.diaries.projects.services;

import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.dto.request.EditWorkDto;
import com.fearwarden.diaries.projects.dto.response.WorkDto;

import java.util.List;

public interface WorkService {
    WorkDto createWork(CreateWorkDto body);
    List<WorkDto> getWorksForProject(String projectId);
    void editWork(String workId, EditWorkDto body);
}
