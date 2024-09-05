package com.fearwarden.diaries.users.services.implementations;

import com.fearwarden.diaries.auth.exceptions.throwables.ForbiddenException;
import com.fearwarden.diaries.users.enums.Role;
import com.fearwarden.diaries.users.models.UserEntity;
import com.fearwarden.diaries.users.services.UserPreAuthorizeService;
import com.fearwarden.diaries.users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service("userPreAuthorizeService")
@RequiredArgsConstructor
public class UserPreAuthorizeServiceImpl implements UserPreAuthorizeService {
    private final UserService userService;

    @Override
    public boolean isAdminOrProjectManager(String username) {
        UserEntity user = (UserEntity) userService.userDetailsService().loadUserByUsername(username);
        if (user.getRole() == Role.USER) throw new ForbiddenException();
        return true;
    }
}
