package com.fearwarden.basemodule.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("User does not exist.");
    }
}
