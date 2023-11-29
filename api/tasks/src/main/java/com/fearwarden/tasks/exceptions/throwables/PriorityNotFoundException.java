package com.fearwarden.tasks.exceptions.throwables;

public class PriorityNotFoundException extends RuntimeException {
    public PriorityNotFoundException() {
        super("Priority does not exist.");
    }
}
