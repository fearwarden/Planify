package com.fearwarden.diaries.tasks.exceptions.throwables;

public class InvalidCompleteStatusException extends RuntimeException {
    public InvalidCompleteStatusException() {
        super("Complete Status is invalid.");
    }
}
