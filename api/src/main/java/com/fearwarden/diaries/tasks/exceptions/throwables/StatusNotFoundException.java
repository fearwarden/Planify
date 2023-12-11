package com.fearwarden.diaries.tasks.exceptions.throwables;

public class StatusNotFoundException extends RuntimeException {
    public StatusNotFoundException() {
        super("Status does not exist.");
    }
}
