package com.fearwarden.diaries.auth.services.implementations;

import com.fearwarden.diaries.auth.dto.response.JwtResponseDto;
import com.fearwarden.diaries.auth.services.AuthenticationService;
import com.fearwarden.diaries.auth.services.JwtService;
import com.fearwarden.diaries.users.exceptions.throwables.TokenNotFoundException;
import com.fearwarden.diaries.users.exceptions.throwables.UserExistException;
import com.fearwarden.diaries.users.exceptions.throwables.UserNotFoundException;
import com.fearwarden.diaries.users.models.TokenEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.repositories.TokenRepository;
import com.fearwarden.diaries.users.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;

    @Transactional
    @Override
    public void register(String email, String firstName, String lastName, String password) {
        this.userRepository.findByEmail(email)
                .ifPresent(userEntity -> { throw new UserExistException(); });

        UserEntity user = UserEntity.builder()
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .password(this.passwordEncoder.encode(password))
                .build();
        this.userRepository.save(user);

        TokenEntity refreshToken = TokenEntity.builder()
                .refreshToken(this.jwtService.generateRefreshToken())
                .userEntity(user)
                .build();
        this.tokenRepository.save(refreshToken);
    }

    @Override
    public JwtResponseDto login(String email, String password) {
        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
        String accessToken = this.jwtService.generateToken(user);
        TokenEntity token = this.tokenRepository.findByUserEntity(user)
                .orElseThrow(TokenNotFoundException::new);
        log.info("User: {} successfully logged in.", user.getEmail());
        return new JwtResponseDto(token, user, accessToken);
    }

    @Override
    public JwtResponseDto refresh(String refreshToken) {
        TokenEntity token = this.tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(TokenNotFoundException::new);
        UserEntity user = this.userRepository.findById(token.getUserEntity().getId())
                .orElseThrow(() -> new UserNotFoundException(token.getUserEntity().getEmail()));

        String accessToken = this.jwtService.generateToken(user);
        String newRefreshToken = this.jwtService.generateRefreshToken();
        token.setRefreshToken(newRefreshToken);
        this.tokenRepository.save(token);
        return new JwtResponseDto(token, user, accessToken);
    }
}
