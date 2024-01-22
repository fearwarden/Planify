package com.fearwarden.diaries.users.exceptions.throwables;

public class UserNotFoundByIdException extends RuntimeException {
    public UserNotFoundByIdException(String id) {
        super("User not found by id: " + id);
    }
}
