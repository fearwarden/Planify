package com.fearwarden.basemodule.exceptions.throwables;

public class UserExistException extends RuntimeException {
    public UserExistException() {
        super("User already exist.");
    }
}
