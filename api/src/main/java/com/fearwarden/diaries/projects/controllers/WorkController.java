package com.fearwarden.diaries.projects.controllers;

import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.services.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/works")
@RequiredArgsConstructor
public class WorkController {
    private final WorkService workService;

    @PostMapping
    public ResponseEntity<Void> createWork(@RequestBody @Validated CreateWorkDto body) {
        workService.createWork(body);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // TODO: change Object to a specific DTO you want to represent a message
    @MessageMapping("/{projectId}/work/update") // to send a message sub to this url
    @SendTo("/topic/{projectId}/works") // to receive a message sub to this url
    public Object broadcastTask(@DestinationVariable String projectId, Object message) {
        // TODO: Call service, which will validate, update and return message
        return message;
    }
}
