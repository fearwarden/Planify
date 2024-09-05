package com.fearwarden.diaries.users.services.implementations;

import com.fearwarden.diaries.users.dto.response.UserDto;
import com.fearwarden.diaries.users.exceptions.throwables.UserNotFoundException;
import com.fearwarden.diaries.users.mappers.UserMapper;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.repositories.UserRepository;
import com.fearwarden.diaries.users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepository.findByEmail(username).orElseThrow(UserNotFoundException::new);
            }
        };
    }

    @Override
    public UserEntity findUserById(UUID id) {
        return this.userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public boolean checkIfUsersExist(List<UserDto> userDtoList) {
        for (UserDto user : userDtoList) {
            if (userRepository.findById(user.id()).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    @Override
    public List<UserDto> findAll(UserEntity user) {
        List<UserEntity> users = userRepository.findAllUsers(user.getId());
        return users.stream().map(userMapper::toDto).toList();
    }
}
