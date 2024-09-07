package com.fearwarden.diaries.projects.services;

import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.dto.response.WorkDto;

public interface WorkService {
    void createWork(CreateWorkDto body);
}
