package com.fearwarden.diaries.metadata.controllers;

import com.fearwarden.diaries.metadata.dto.TypeDto;
import com.fearwarden.diaries.metadata.services.MetadataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/metadata")
@RequiredArgsConstructor
public class MetadataController {
    private final MetadataService metadataService;

    @GetMapping("/type")
    public ResponseEntity<List<TypeDto>> getTypes() {
        List<TypeDto> allTypes = metadataService.getAllTypes();
        return ResponseEntity.ok(allTypes);
    }
}
