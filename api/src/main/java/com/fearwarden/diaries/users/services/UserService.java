package com.fearwarden.diaries.users.services;

import com.fearwarden.diaries.users.dto.response.UserDto;
import com.fearwarden.diaries.users.models.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserDetailsService userDetailsService();
    UserEntity findUserById(UUID id);
    boolean checkIfUsersExist(List<UserDto> userDtoList);
    List<UserDto> findAll(UserEntity user);
}
