package com.fearwarden.diaries.projects.mappers;

import com.fearwarden.diaries.projects.dto.response.ProjectDto;
import com.fearwarden.diaries.projects.models.ProjectEntity;
import com.fearwarden.diaries.projects.tools.PathConversionService;
import com.fearwarden.diaries.tasks.tools.HelperFunctions;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

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
            return dto.withIconPathAndDate(
                    s,
                    HelperFunctions.convertDateToString(entity.getCreatedAt()),
                    HelperFunctions.convertDateToString(entity.getUpdatedAt())
            );
        }
        return dto;
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract ProjectEntity partialUpdate(ProjectDto projectDto, @MappingTarget ProjectEntity projectEntity);
}