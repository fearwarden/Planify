package com.fearwarden.diaries.projects.services.implementations;

import com.fearwarden.diaries.projects.dto.response.ProjectMembershipDto;
import com.fearwarden.diaries.projects.mappers.ProjectMapper;
import com.fearwarden.diaries.projects.mappers.ProjectMembershipMapper;
import com.fearwarden.diaries.projects.models.ProjectEntity;
import com.fearwarden.diaries.projects.models.ProjectMembershipEntity;
import com.fearwarden.diaries.projects.repositories.ProjectMembershipRepository;
import com.fearwarden.diaries.projects.services.ProjectMembershipService;
import com.fearwarden.diaries.projects.services.ProjectService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectMembershipServiceImpl implements ProjectMembershipService {
    private final ProjectMembershipRepository membershipRepository;
    private final ProjectService projectService;
    private final ProjectMapper projectMapper;
    private final ProjectMembershipMapper membershipMapper;

    @Override
    @Transactional
    public List<ProjectMembershipDto> getMembershipsForProject(String projectId) {
        log.debug("{} project id has been obtained.", projectId);
        ProjectEntity project = projectMapper.toEntity(projectService.getProject(projectId));
        Set<ProjectMembershipEntity> memberships = membershipRepository.findAllByProjectEntity(project);
        log.info("{} memberships have been fetched", memberships);
        return memberships.stream().map(membershipMapper::toDto).toList();
    }
}
