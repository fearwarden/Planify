package com.fearwarden.diaries.metadata.mappers;

import com.fearwarden.diaries.metadata.dto.TypeEntityDto;
import com.fearwarden.diaries.metadata.models.TypeEntity;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TypeEntityMapper {
    TypeEntity toEntity(TypeEntityDto typeEntityDto);

    TypeEntityDto toDto(TypeEntity typeEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    TypeEntity partialUpdate(TypeEntityDto typeEntityDto, @MappingTarget TypeEntity typeEntity);
}