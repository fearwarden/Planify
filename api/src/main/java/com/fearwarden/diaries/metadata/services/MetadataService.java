package com.fearwarden.diaries.metadata.services;

import com.fearwarden.diaries.metadata.dto.StatusDto;
import com.fearwarden.diaries.metadata.dto.TypeDto;
import com.fearwarden.diaries.metadata.mappers.StatusMapper;
import com.fearwarden.diaries.metadata.mappers.TypeEntityMapper;
import com.fearwarden.diaries.metadata.models.TypeEntity;
import com.fearwarden.diaries.metadata.repositories.StatusRepository;
import com.fearwarden.diaries.metadata.repositories.TypeEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MetadataService {
    private final TypeEntityRepository typeEntityRepository;
    private final StatusRepository statusRepository;
    private final TypeEntityMapper typeEntityMapper;
    private final StatusMapper statusMapper;

    public List<TypeDto> getAllTypes() {
        return typeEntityRepository.findAll().stream().map(typeEntityMapper::toDto).toList();
    }

    public List<StatusDto> getStatuses() {
        return statusRepository.findAll().stream().map(statusMapper::toDto).toList();
    }
}
