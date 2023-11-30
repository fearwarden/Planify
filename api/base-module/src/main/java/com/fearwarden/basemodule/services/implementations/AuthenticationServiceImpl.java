package com.fearwarden.basemodule.services.implementations;

import com.fearwarden.basemodule.dto.response.JwtResponseDto;
import com.fearwarden.basemodule.exceptions.throwables.UserExistException;
import com.fearwarden.basemodule.models.TokenEntity;
import com.fearwarden.basemodule.models.UserEntity;
import com.fearwarden.basemodule.repositories.TokenRepository;
import com.fearwarden.basemodule.repositories.UserRepository;
import com.fearwarden.basemodule.services.AuthenticationService;
import com.fearwarden.basemodule.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;

    @Transactional
    @Override
    public void register(String email, String firstName, String lastName, String password) {
        Optional<UserEntity> userOptional = this.userRepository.findByEmail(email);

        if (userOptional.isPresent()) throw new UserExistException();

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPassword(this.passwordEncoder.encode(password));
        this.userRepository.save(user);

        TokenEntity refreshToken = new TokenEntity();
        UUID refreshTokenId = UUID.randomUUID();
        refreshToken.setId(refreshTokenId);
        refreshToken.setRefreshToken(this.jwtService.generateRefreshToken());
        refreshToken.setUserEntity(user);
        this.tokenRepository.save(refreshToken);
    }

    @Override
    public JwtResponseDto login(String email, String password) {
        return null;
    }

    @Override
    public JwtResponseDto refresh(String refreshToken) {
        return null;
    }
}
