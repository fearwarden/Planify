package com.fearwarden.diaries.projects.services.implementations;

import com.fearwarden.diaries.projects.dto.response.ProjectDto;
import com.fearwarden.diaries.projects.exceptions.throwables.ProjectDoesNotExistsException;
import com.fearwarden.diaries.projects.mappers.ProjectMapper;
import com.fearwarden.diaries.projects.models.ProjectEntity;
import com.fearwarden.diaries.projects.repositories.ProjectMembershipRepository;
import com.fearwarden.diaries.projects.repositories.ProjectRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private ProjectMembershipRepository membershipRepository;

    @Mock
    private ProjectMapper projectMapper;

    @InjectMocks
    private ProjectServiceImpl projectService;

    @Test
    @DisplayName("Get Project By Id - Success")
    void testGetProjectById_Success() {
        UUID projectId = UUID.randomUUID();

        ProjectEntity project = new ProjectEntity();
        project.setId(projectId);
        ProjectDto projectDto = new ProjectDto(
                projectId,
                "name",
                null,
                null,
                "path",
                null,
                "url"
        );

        when(projectRepository.findById(any(UUID.class))).thenReturn(Optional.of(project));
        when(projectMapper.toDto(any(ProjectEntity.class))).thenReturn(projectDto);

        ProjectDto response = projectService.getProject(String.valueOf(projectId));

        assertNotNull(response);
        assertEquals(projectDto, response);
    }

    @Test
    @DisplayName("Get Project By Id - Not Found")
    void testGetProjectById_NotFound() {
        String projectId = UUID.randomUUID().toString();

        when(projectRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        ProjectDoesNotExistsException exception = assertThrows(ProjectDoesNotExistsException.class, () -> projectService.getProject(projectId));
        String message = "Project does not exists with id: " + projectId;

        assertEquals(message, exception.getMessage());
    }

}