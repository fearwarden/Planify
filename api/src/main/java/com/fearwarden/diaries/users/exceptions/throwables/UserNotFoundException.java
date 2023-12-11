package com.fearwarden.diaries.users.exceptions.throwables;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("User does not exist.");
    }
}
