package com.fearwarden.diaries.metadata.mappers;

import com.fearwarden.diaries.metadata.dto.TypeDto;
import com.fearwarden.diaries.metadata.models.TypeEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TypeEntityMapper {
    TypeEntity toEntity(TypeDto typeEntityDto);

    TypeDto toDto(TypeEntity typeEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    TypeEntity partialUpdate(TypeDto typeEntityDto, @MappingTarget TypeEntity typeEntity);
}