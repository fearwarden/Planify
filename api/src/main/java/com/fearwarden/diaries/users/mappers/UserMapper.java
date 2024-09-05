package com.fearwarden.diaries.users.mappers;

import com.fearwarden.diaries.users.dto.response.UserDto;
import com.fearwarden.diaries.users.models.UserEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)public interface UserMapper {
    UserEntity toEntity(UserDto userDto);

    UserDto toDto(UserEntity userEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)UserEntity partialUpdate(UserDto userDto, @MappingTarget UserEntity userEntity);
}