package com.fearwarden.diaries.security.config;

import com.fearwarden.diaries.security.filters.JwtAuthenticationFilter;
import com.fearwarden.diaries.users.enums.Role;
import com.fearwarden.diaries.users.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.nio.file.AccessDeniedException;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class WebSecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserService userService;
    private final LogoutHandlerImpl logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request ->
                        request.requestMatchers("/api/v1/auth/**")
                                .permitAll()
                                .requestMatchers("/api/v1/users/**").hasAnyAuthority(Role.USER.name(), Role.PROJECT_MANAGER.name(), Role.ADMIN.name())
                                .requestMatchers("/api/v1/tasks/**").hasAnyAuthority(Role.USER.name(), Role.PROJECT_MANAGER.name(),Role.ADMIN.name())
                                .requestMatchers("/api/v1/metadata/**").hasAnyAuthority(Role.USER.name(), Role.PROJECT_MANAGER.name(),Role.ADMIN.name())
                                .requestMatchers("/api/v1/projects/**").hasAnyAuthority(Role.USER.name(), Role.PROJECT_MANAGER.name(),Role.ADMIN.name())
                                .requestMatchers("/api/v1/works").hasAnyAuthority(Role.USER.name(), Role.PROJECT_MANAGER.name(), Role.ADMIN.name())
                                .requestMatchers("/api/v1/memberships/**").hasAnyAuthority(Role.USER.name(), Role.PROJECT_MANAGER.name(),Role.ADMIN.name())
                                .anyRequest().authenticated()
                )
                .logout((logout) -> logout
                        .logoutUrl("/api/v1/auth/logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler(((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        }))
                        .permitAll()
                )
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(this.authenticationProvider()).addFilterBefore(
                        this.jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(this.userService.userDetailsService());
        authProvider.setPasswordEncoder(this.passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
