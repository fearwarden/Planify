package com.fearwarden.diaries.projects.mappers;

import com.fearwarden.diaries.projects.dto.response.WorkDto;
import com.fearwarden.diaries.projects.models.WorkEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface WorkMapper {
    WorkEntity toEntity(WorkDto workDto);

    WorkDto toDto(WorkEntity workEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    WorkEntity partialUpdate(WorkDto workDto, @MappingTarget WorkEntity workEntity);
}