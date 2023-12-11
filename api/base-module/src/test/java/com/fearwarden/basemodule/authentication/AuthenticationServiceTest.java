package com.fearwarden.basemodule.authentication;

import com.fearwarden.basemodule.enums.Role;
import com.fearwarden.basemodule.exceptions.UserExistException;
import com.fearwarden.basemodule.models.TokenEntity;
import com.fearwarden.basemodule.models.UserEntity;
import com.fearwarden.basemodule.repositories.TokenRepository;
import com.fearwarden.basemodule.repositories.UserRepository;
import com.fearwarden.basemodule.services.implementations.AuthenticationServiceImpl;
import com.fearwarden.basemodule.services.implementations.JwtServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;
    @Mock
    private JwtServiceImpl jwtService;
    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;
    @Mock
    private TokenRepository tokenRepository;

    @AfterEach
    public void tearDown() {
        Mockito.reset(passwordEncoder);
    }

    @Test
    public void shouldThrowUserExistException() {
        UUID mockId = UUID.randomUUID();
        LocalDateTime mockTime = LocalDateTime.now();
        UserEntity mockUser = new UserEntity(
                mockId,
                "mock@mock.com",
                "mock",
                "mock",
                "mock12345",
                mockTime,
                Role.USER,
                null
        );

        when(userRepository.findByEmail("mock@mock.com")).thenReturn(Optional.of(mockUser));

        assertThrows(UserExistException.class, () -> {
            authenticationService.register("mock@mock.com", "mock", "mock", "mock12345");
        });
    }
    @Test
    public void shouldSaveNewUserWhenRegistering() {
        when(userRepository.findByEmail("mock@mock.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(jwtService.generateRefreshToken()).thenReturn("refreshToken");
        authenticationService.register(
                "mock@mock.com",
                "mock",
                "mock",
                "mock12345"
        );

        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    public void shouldSaveTokenOnNewUserRegistration() {
        when(userRepository.findByEmail("mock@mock.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(jwtService.generateRefreshToken()).thenReturn("refreshToken");
        authenticationService.register(
                "mock@mock.com",
                "mock",
                "mock",
                "mock12345"
        );
        verify(tokenRepository, times(1)).save(any(TokenEntity.class));
    }
}
