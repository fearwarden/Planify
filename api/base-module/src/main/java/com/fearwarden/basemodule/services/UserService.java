package com.fearwarden.basemodule.services;

import com.fearwarden.basemodule.models.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.UUID;

public interface UserService {
    UserDetailsService userDetailsService();
    UserEntity findUserById(UUID id);
}
