package com.fearwarden.basemodule.exceptions;

public class UserExistException extends RuntimeException {
    public UserExistException() {
        super("User already exist.");
    }
}
