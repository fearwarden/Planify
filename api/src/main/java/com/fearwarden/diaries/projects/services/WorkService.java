package com.fearwarden.diaries.projects.services;

import com.fearwarden.diaries.metadata.dto.StatusDto;
import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.dto.request.EditWorkDto;
import com.fearwarden.diaries.projects.dto.response.WorkDto;
import com.fearwarden.diaries.projects.models.WorkEntity;

import java.util.List;

public interface WorkService {
    WorkEntity getWorkById(String id);

    WorkDto createWork(CreateWorkDto body);

    List<WorkDto> getWorksForProject(String projectId);

    void editWork(String workId, EditWorkDto body);

    void updateWorkStatusAndOrder(String workId, String statusProgress, int workOrder);

    void deleteWork(String workId);
}
