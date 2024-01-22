package com.fearwarden.diaries.users.services.implementations;

import com.fearwarden.diaries.users.exceptions.throwables.UserNotFoundByIdException;
import com.fearwarden.diaries.users.exceptions.throwables.UserNotFoundException;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.repositories.UserRepository;
import com.fearwarden.diaries.users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException(username));
            }
        };
    }

    @Override
    public UserEntity findUserById(UUID id) {
        return this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundByIdException(id.toString()));
    }


}
