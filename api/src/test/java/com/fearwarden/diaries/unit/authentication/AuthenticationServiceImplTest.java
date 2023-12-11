package com.fearwarden.diaries.unit.authentication;

import com.fearwarden.diaries.auth.services.implementations.AuthenticationServiceImpl;
import com.fearwarden.diaries.auth.services.implementations.JwtServiceImpl;
import com.fearwarden.diaries.users.enums.Role;
import com.fearwarden.diaries.users.exceptions.throwables.UserExistException;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.repositories.TokenRepository;
import com.fearwarden.diaries.users.repositories.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyString;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceImplTest {
    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtServiceImpl jwtService;
    @Mock
    private TokenRepository tokenRepository;

    @AfterEach
    public void tearDown() {
        Mockito.reset(passwordEncoder);
    }

    @Test
    public void shouldThrowUserExistException() {
        // Arrange
        String email = "test@example.com";
        String firstName = "John";
        String lastName = "Doe";
        String password = "password123";
        UUID id = UUID.randomUUID();
        LocalDateTime time = LocalDateTime.now();
        UserEntity mockUser = UserEntity.builder()
                .id(id)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .createdAt(time)
                .role(Role.USER)
                .tasks(null)
                .tokenEntity(null).build();

        // Act
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));

        when(passwordEncoder.encode(anyString())).thenReturn(password);

        //Assert
        assertThrows(UserExistException.class, () -> {
           authenticationService.register(email, firstName, lastName, password);
        });
    }
}
