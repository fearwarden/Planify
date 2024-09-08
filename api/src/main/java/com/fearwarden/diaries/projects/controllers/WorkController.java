package com.fearwarden.diaries.projects.controllers;

import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.dto.response.WorkDto;
import com.fearwarden.diaries.projects.services.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/works")
@RequiredArgsConstructor
public class WorkController {
    private final WorkService workService;
    private final SimpMessagingTemplate template;

    @PostMapping
    public ResponseEntity<Void> createWork(@RequestBody @Validated CreateWorkDto body) {
        WorkDto work = workService.createWork(body);
        template.convertAndSend("/topic", work);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<WorkDto>> getWorksForProject(@PathVariable String projectId) {
        List<WorkDto> works = workService.getWorksForProject(projectId);
        return ResponseEntity.ok(works);
    }

    // TODO: change Object to a specific DTO you want to represent a message
    @MessageMapping("/{projectId}/work/update") // to send a message sub to this url
    @SendTo("/topic/{projectId}/works") // to receive a message sub to this url
    public Object broadcastTask(@DestinationVariable String projectId, Object message) {
        // TODO: Call service, which will validate, update and return message
        return message;
    }
}
