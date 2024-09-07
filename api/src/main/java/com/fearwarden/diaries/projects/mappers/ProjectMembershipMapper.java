package com.fearwarden.diaries.projects.mappers;

import com.fearwarden.diaries.projects.dto.response.ProjectMembershipDto;
import com.fearwarden.diaries.projects.models.ProjectMembershipEntity;
import com.fearwarden.diaries.users.mappers.UserMapper;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class, ProjectMapper.class})
public interface ProjectMembershipMapper {
    ProjectMembershipEntity toEntity(ProjectMembershipDto projectMembershipDto);

    @Mapping(source = "userEntity", target = "userDto")
    @Mapping(source = "projectEntity", target = "projectDto")
    ProjectMembershipDto toDto(ProjectMembershipEntity projectMembershipEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ProjectMembershipEntity partialUpdate(ProjectMembershipDto projectMembershipDto, @MappingTarget ProjectMembershipEntity projectMembershipEntity);
}