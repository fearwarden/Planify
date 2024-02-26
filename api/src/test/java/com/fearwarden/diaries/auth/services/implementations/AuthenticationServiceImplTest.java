package com.fearwarden.diaries.auth.services.implementations;

import com.fearwarden.diaries.auth.dto.response.JwtResponseDto;
import com.fearwarden.diaries.auth.services.AuthenticationService;
import com.fearwarden.diaries.auth.services.JwtService;
import com.fearwarden.diaries.users.exceptions.throwables.UserExistException;
import com.fearwarden.diaries.users.exceptions.throwables.UserNotFoundException;
import com.fearwarden.diaries.users.models.TokenEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.repositories.TokenRepository;
import com.fearwarden.diaries.users.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
class AuthenticationServiceImplTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private TokenRepository tokenRepository;
    @Mock
    private AuthenticationManager authenticationManager;
    private AuthenticationService authenticationService;

    @BeforeEach
    void init() {
        this.authenticationService = new AuthenticationServiceImpl(
                userRepository,
                passwordEncoder,
                jwtService,
                tokenRepository,
                authenticationManager
        );
    }

    @Nested
    class RegisterTests {

        @Test
        void shouldRegisterNewUserSuccessfully() {
            String mockEmail = "mock@mock.com";
            String mockFirstName = "Mock";
            String mockLastName = "Mock";
            String mockPassword = "Mock1234";
            String mockHashedPassword = "encodedPassword";
            String mockRefreshToken = "jwtToken";
            UserEntity mockUser = new UserEntity();
            mockUser.setEmail(mockEmail);
            mockUser.setFirstName(mockFirstName);
            mockUser.setLastName(mockLastName);
            mockUser.setPassword(mockHashedPassword);
            TokenEntity mockToken = new TokenEntity();
            mockToken.setRefreshToken(mockRefreshToken);
            mockToken.setUserEntity(mockUser);

            when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.empty());
            when(passwordEncoder.encode(any(String.class))).thenReturn(mockHashedPassword);
            when(jwtService.generateRefreshToken()).thenReturn(mockRefreshToken);

            authenticationService.register(
                    mockEmail,
                    mockFirstName,
                    mockLastName,
                    mockPassword
            );

            verify(userRepository).findByEmail(mockEmail);
            verify(passwordEncoder).encode(mockPassword);
            verify(userRepository).save(mockUser);
            verify(jwtService).generateRefreshToken();
            verify(tokenRepository).save(mockToken);
        }
        @Test
        void shouldThrowUserExistException() {
            String mockEmail = "mock@mock.com";
            String mockFirstName = "Mock";
            String mockLastName = "Mock";
            String mockPassword = "Mock1234";
            String mockHashedPassword = "encodedPassword";
            UserEntity mockUser = new UserEntity();
            mockUser.setEmail(mockEmail);
            mockUser.setFirstName(mockFirstName);
            mockUser.setLastName(mockLastName);
            mockUser.setPassword(mockHashedPassword);

            when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.of(mockUser));
            assertThrows(UserExistException.class, () -> authenticationService.register(
                    mockEmail,
                    mockFirstName,
                    mockLastName,
                    mockPassword
            ));

            verify(userRepository).findByEmail(mockEmail);
        }
    }
    @Nested
    class LoginTests {
        @Test
        void shouldLoginUserSuccessfully() {
            UUID mockId = UUID.randomUUID();
            String mockEmail = "mock@mock.com";
            String mockFirstName = "Mock";
            String mockLastName = "Mock";
            String mockPassword = "Mock1234";
            String mockHashedPassword = "encodedPassword";
            String accessToken = "accessToken";
            UserEntity mockUser = new UserEntity();
            mockUser.setId(mockId);
            mockUser.setEmail(mockEmail);
            mockUser.setFirstName(mockFirstName);
            mockUser.setLastName(mockLastName);
            mockUser.setPassword(mockHashedPassword);
            String mockRefreshToken = "jwtToken";
            TokenEntity mockToken = new TokenEntity();
            mockToken.setRefreshToken(mockRefreshToken);
            mockToken.setUserEntity(mockUser);

            when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.of(mockUser));
            when(jwtService.generateToken(mockUser)).thenReturn(accessToken);
            when(tokenRepository.findByUserEntity(mockUser)).thenReturn(Optional.of(mockToken));
            JwtResponseDto expectedJwtResponseDto = new JwtResponseDto(
                    mockToken,
                    mockUser,
                    accessToken
            );

            JwtResponseDto response = authenticationService.login(
                    mockEmail,
                    mockPassword
            );

            assertEquals(response, expectedJwtResponseDto);

            verify(authenticationManager).authenticate(
                    new UsernamePasswordAuthenticationToken(mockEmail, mockPassword)
            );
            verify(userRepository).findByEmail(mockEmail);
            verify(jwtService).generateToken(mockUser);
            verify(tokenRepository).findByUserEntity(mockUser);
        }
        @Test
        void shouldThrowExceptionForInvalidCredentials() {
            String mockEmail = "mock@mock.com";
            String mockPassword = "mock";

            when(authenticationManager.authenticate(
                    any(UsernamePasswordAuthenticationToken.class)
            )).thenThrow(BadCredentialsException.class);
            assertThrows(BadCredentialsException.class, () -> authenticationService.login(mockEmail, mockPassword));
            verify(authenticationManager).authenticate(new UsernamePasswordAuthenticationToken(mockEmail, mockPassword));
        }
        @Test
        void shouldThrowUserNotFoundException() {
            String mockEmail = "mock@mock.email";
            String mockPassword = "password";

            when(userRepository.findByEmail(any(String.class))).thenThrow(UserNotFoundException.class);
            assertThrows(UserNotFoundException.class, () -> authenticationService.login(mockEmail, mockPassword));
            verify(userRepository).findByEmail(mockEmail);
        }
    }
}