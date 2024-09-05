package com.fearwarden.diaries.users.repositories;

import com.fearwarden.diaries.users.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByEmail(String email);
    @Query("SELECT u FROM UserEntity u WHERE u.id <> :id")
    List<UserEntity> findAllUsers(@Param("id") UUID id);
}
