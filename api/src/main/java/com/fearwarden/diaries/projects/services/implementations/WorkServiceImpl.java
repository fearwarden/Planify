package com.fearwarden.diaries.projects.services.implementations;

import com.fearwarden.diaries.metadata.models.StatusEntity;
import com.fearwarden.diaries.metadata.models.TypeEntity;
import com.fearwarden.diaries.metadata.repositories.StatusRepository;
import com.fearwarden.diaries.metadata.repositories.TypeEntityRepository;
import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.dto.response.WorkDto;
import com.fearwarden.diaries.projects.mappers.WorkMapper;
import com.fearwarden.diaries.projects.models.ProjectEntity;
import com.fearwarden.diaries.projects.models.ProjectMembershipEntity;
import com.fearwarden.diaries.projects.models.WorkEntity;
import com.fearwarden.diaries.projects.repositories.ProjectMembershipRepository;
import com.fearwarden.diaries.projects.repositories.WorkRepository;
import com.fearwarden.diaries.projects.services.ProjectService;
import com.fearwarden.diaries.projects.services.WorkService;
import com.fearwarden.diaries.tasks.exceptions.throwables.StatusNotFoundException;
import com.fearwarden.diaries.tasks.exceptions.throwables.TypeNotFoundException;
import com.fearwarden.diaries.tasks.tools.HelperFunctions;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class WorkServiceImpl implements WorkService {
    private final WorkRepository workRepository;
    private final ProjectService projectService;
    private final UserService userService;
    private final ProjectMembershipRepository membershipRepository;
    private final StatusRepository statusRepository;
    private final TypeEntityRepository typeEntityRepository;
    private final WorkMapper workMapper;

    @Transactional
    @Override
    public WorkDto createWork(CreateWorkDto body) {
        ProjectEntity project = projectService.getProjectEntity(body.projectId());
        UserEntity user = userService.findUserById(body.user().id());
        TypeEntity typeEntity = typeEntityRepository.findById(body.type().id()).orElseThrow(TypeNotFoundException::new);
        StatusEntity status = statusRepository.findById(body.status().id()).orElseThrow(StatusNotFoundException::new);
        ProjectMembershipEntity membership = membershipRepository.findByProjectEntityAndUserEntity(project, user);
        int order = workRepository.maximumWorkOrder(status);

        WorkEntity newWork = new WorkEntity();
        newWork.setTitle(body.title());
        newWork.setDescription(body.description());
        LocalDateTime targetDate = HelperFunctions.convertStringToLocalDateTime(body.targetDate());
        newWork.setTargetDate(targetDate);
        newWork.setProjectEntity(project);
        newWork.setTypeEntity(typeEntity);
        newWork.setStatusEntity(status);
        newWork.setAssignee(membership);
        newWork.setWorkOrder(order + 1);
        workRepository.save(newWork);
        log.info("{} work has been created", newWork);
        return workMapper.toDto(newWork);
    }

    @Override
    public List<WorkDto> getWorksForProject(String projectId) {
        ProjectEntity project = projectService.getProjectEntity(projectId);
        List<WorkEntity> works = workRepository.findAllByProjectEntity(project);
        return works.stream().map(workMapper::toDto).toList();
    }
}
