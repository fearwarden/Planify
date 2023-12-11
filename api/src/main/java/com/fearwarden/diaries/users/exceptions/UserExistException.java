package com.fearwarden.diaries.users.exceptions;

public class UserExistException extends RuntimeException {
    public UserExistException() {
        super("User already exist.");
    }
}
