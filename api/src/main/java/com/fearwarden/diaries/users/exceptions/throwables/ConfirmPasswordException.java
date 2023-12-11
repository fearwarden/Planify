package com.fearwarden.diaries.users.exceptions.throwables;

public class ConfirmPasswordException extends RuntimeException {
    public ConfirmPasswordException() {
        super("Passwords do not match. Please try again.");
    }
}
