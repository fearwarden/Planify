package com.fearwarden.basemodule.services.implementations;

import com.fearwarden.basemodule.exceptions.throwables.UserNotFoundException;
import com.fearwarden.basemodule.models.UserEntity;
import com.fearwarden.basemodule.repositories.UserRepository;
import com.fearwarden.basemodule.services.UserService;
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
                return userRepository.findByEmail(username).orElseThrow(UserNotFoundException::new);
            }
        };
    }

    @Override
    public UserEntity findUserById(UUID id) {
        return this.userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }


}
