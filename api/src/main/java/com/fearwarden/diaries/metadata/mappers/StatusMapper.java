package com.fearwarden.diaries.metadata.mappers;

import com.fearwarden.diaries.metadata.dto.StatusDto;
import com.fearwarden.diaries.metadata.models.StatusEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)public interface StatusMapper {
    StatusEntity toEntity(StatusDto statusDto);

    StatusDto toDto(StatusEntity statusEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)StatusEntity partialUpdate(StatusDto statusDto, @MappingTarget StatusEntity statusEntity);
}