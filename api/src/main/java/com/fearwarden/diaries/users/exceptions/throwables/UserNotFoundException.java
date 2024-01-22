package com.fearwarden.diaries.users.exceptions.throwables;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String email) {
        super("User does not exist with email: " + email);
    }
}
