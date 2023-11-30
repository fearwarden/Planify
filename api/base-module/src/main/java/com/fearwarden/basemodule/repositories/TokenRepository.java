package com.fearwarden.basemodule.repositories;

import com.fearwarden.basemodule.models.TokenEntity;
import com.fearwarden.basemodule.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenEntity, String> {
    Optional<TokenEntity> findByUserEntity(UserEntity user);
}
