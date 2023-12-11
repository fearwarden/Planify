package com.fearwarden.tasks.exceptions;

public class StatusNotFoundException extends RuntimeException {
    public StatusNotFoundException() {
        super("Status does not exist.");
    }
}
