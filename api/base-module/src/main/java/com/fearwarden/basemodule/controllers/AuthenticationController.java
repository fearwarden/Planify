package com.fearwarden.basemodule.controllers;

import com.fearwarden.basemodule.dto.request.LoginDto;
import com.fearwarden.basemodule.dto.request.RegisterDto;
import com.fearwarden.basemodule.dto.response.JwtResponseDto;
import com.fearwarden.basemodule.services.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> login(@RequestBody @Validated LoginDto body, HttpServletResponse response) {
        JwtResponseDto loginService = this.authenticationService.login(body.getEmail(), body.getPassword());
        this.cookieManager("accessToken", loginService.getAccessToken(), response);
        this.cookieManager("refreshToken", loginService.getRefreshToken(), response);
        return new ResponseEntity<>(loginService, HttpStatus.OK);
    }

    private <T> void cookieManager(String name, T data, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, data.toString());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(7 * 24 * 60 * 60);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
