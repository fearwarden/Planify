package com.fearwarden.diaries.users.controllers;

import com.fearwarden.diaries.users.dto.response.UserDto;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PreAuthorize("@userPreAuthorizeService.isAdminOrProjectManager(principal.username)")
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers(@AuthenticationPrincipal UserEntity user) {
        List<UserDto> users = userService.findAll(user);
        return ResponseEntity.ok(users);
    }

}
