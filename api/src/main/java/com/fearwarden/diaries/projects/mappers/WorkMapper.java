package com.fearwarden.diaries.projects.mappers;

import com.fearwarden.diaries.metadata.mappers.StatusMapper;
import com.fearwarden.diaries.projects.dto.response.WorkDto;
import com.fearwarden.diaries.projects.models.WorkEntity;
import org.mapstruct.*;
import org.springframework.data.convert.TypeMapper;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {TypeMapper.class, ProjectMembershipMapper.class, StatusMapper.class})
public interface WorkMapper {
    WorkEntity toEntity(WorkDto workDto);

    @Mapping(source = "typeEntity", target = "typeDto")
    @Mapping(source = "assignee", target = "assignee")
    @Mapping(source = "statusEntity", target = "statusDto")
    WorkDto toDto(WorkEntity workEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    WorkEntity partialUpdate(WorkDto workDto, @MappingTarget WorkEntity workEntity);
}