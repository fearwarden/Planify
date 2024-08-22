package com.fearwarden.diaries.security.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class LogoutHandlerImpl implements LogoutHandler {
    private final List<String> cookiesToClear = Arrays.asList("accessToken", "refreshToken");

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookiesToClear.contains(cookie.getName())) {
                    Cookie newCookie = new Cookie(cookie.getName(), null);
                    newCookie.setPath("/");
                    newCookie.setHttpOnly(true);
                    newCookie.setMaxAge(0);
                    response.addCookie(newCookie);
                }
            }
        }
    }
}
