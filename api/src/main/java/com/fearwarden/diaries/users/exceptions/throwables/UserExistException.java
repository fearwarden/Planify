package com.fearwarden.diaries.users.exceptions.throwables;

public class UserExistException extends RuntimeException {
    public UserExistException() {
        super("User already exist.");
    }
}
