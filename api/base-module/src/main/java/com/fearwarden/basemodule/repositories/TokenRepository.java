package com.fearwarden.basemodule.repositories;

import com.fearwarden.basemodule.models.TokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<TokenEntity, String> {
}
