package com.fearwarden.diaries.users.repositories;

import com.fearwarden.diaries.users.models.TokenEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenEntity, String> {
    Optional<TokenEntity> findByUserEntity(UserEntity user);
    Optional<TokenEntity> findByRefreshToken(String refreshToken);
}
