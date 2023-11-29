package com.fearwarden.basemodule.dto.response;

import com.fearwarden.basemodule.models.TokenEntity;
import com.fearwarden.basemodule.models.UserEntity;
import lombok.Data;

@Data
public class JwtResponseDto {
    private String id;
    private String accessToken;
    private String refreshToken;
    private String email;

    public JwtResponseDto(TokenEntity token, UserEntity user, String accessToken) {
        this.id = token.getId().toString();
        this.accessToken = accessToken;
        this.refreshToken = token.getRefreshToken();
        this.email = user.getEmail();
    }
}
