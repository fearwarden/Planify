package com.fearwarden.tasks.exceptions;

public class PriorityNotFoundException extends RuntimeException {
    public PriorityNotFoundException() {
        super("Priority does not exist.");
    }
}
