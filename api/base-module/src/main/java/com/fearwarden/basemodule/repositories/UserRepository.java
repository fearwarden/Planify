package com.fearwarden.basemodule.repositories;

import com.fearwarden.basemodule.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
}
