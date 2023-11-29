package com.fearwarden.basemodule.controllers;

import com.fearwarden.basemodule.dto.request.RegisterDto;
import com.fearwarden.basemodule.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Validated RegisterDto body) {
        this.authenticationService.register(body.getEmail(), body.getFirstName(), body.getLastName(), body.getPassword());
        return new ResponseEntity<>("User successfully registered.", HttpStatus.CREATED);
    }
}
