package com.fearwarden.diaries.users.services;

import com.fearwarden.diaries.users.models.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.UUID;

public interface UserService {
    UserDetailsService userDetailsService();
    UserEntity findUserById(UUID id);
}
