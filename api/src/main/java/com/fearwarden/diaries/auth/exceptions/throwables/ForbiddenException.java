package com.fearwarden.diaries.auth.exceptions.throwables;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException() {
        super("Forbidden.");
    }
}
