package com.fearwarden.diaries.projects.mappers;

import com.fearwarden.diaries.projects.dto.response.ProjectMembershipDto;
import com.fearwarden.diaries.projects.models.ProjectMembershipEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ProjectMembershipMapper {
    ProjectMembershipEntity toEntity(ProjectMembershipDto projectMembershipDto);

    ProjectMembershipDto toDto(ProjectMembershipEntity projectMembershipEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ProjectMembershipEntity partialUpdate(ProjectMembershipDto projectMembershipDto, @MappingTarget ProjectMembershipEntity projectMembershipEntity);
}