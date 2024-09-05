package com.fearwarden.diaries.users.services;

import java.util.UUID;

public interface UserPreAuthorizeService {
    boolean isAdminOrProjectManager(String username);
}
