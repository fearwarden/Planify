package com.fearwarden.diaries.auth.services;

import com.fearwarden.diaries.auth.dto.response.JwtResponseDto;

public interface AuthenticationService {
    void register(String email, String firstName, String lastName, String password);
    JwtResponseDto login(String email, String password);
    JwtResponseDto refresh(String refreshToken);
}
