package com.fearwarden.diaries.projects.mappers;

import com.fearwarden.diaries.projects.dto.response.ProjectDto;
import com.fearwarden.diaries.projects.models.ProjectEntity;
import com.fearwarden.diaries.projects.tools.PathConversionService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class ProjectMapper {
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private PathConversionService pathConversionService;

    public abstract ProjectEntity toEntity(ProjectDto projectDto);

    @Mapping(target = "iconPath", ignore = true)
    public abstract ProjectDto toDto(ProjectEntity projectEntity);

    @AfterMapping
    protected ProjectDto convertIconPath(ProjectEntity entity, @MappingTarget ProjectDto dto) {
        if (entity.getIconPath() != null) {
            String s = pathConversionService.convertToRelativeUrl(entity.getIconPath(), uploadDir);
            return dto.withIconPath(s);
        }
        return dto;
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract ProjectEntity partialUpdate(ProjectDto projectDto, @MappingTarget ProjectEntity projectEntity);
}