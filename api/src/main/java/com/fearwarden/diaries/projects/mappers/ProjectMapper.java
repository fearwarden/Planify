package com.fearwarden.diaries.projects.mappers;

import com.fearwarden.diaries.projects.dto.response.ProjectDto;
import com.fearwarden.diaries.projects.models.ProjectEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)public interface ProjectMapper {
    ProjectEntity toEntity(ProjectDto projectDto);

    ProjectDto toDto(ProjectEntity projectEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)ProjectEntity partialUpdate(ProjectDto projectDto, @MappingTarget ProjectEntity projectEntity);
}