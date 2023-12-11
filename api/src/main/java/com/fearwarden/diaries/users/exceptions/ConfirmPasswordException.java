package com.fearwarden.diaries.users.exceptions;

public class ConfirmPasswordException extends RuntimeException {
    public ConfirmPasswordException() {
        super("Passwords do not match. Please try again.");
    }
}
