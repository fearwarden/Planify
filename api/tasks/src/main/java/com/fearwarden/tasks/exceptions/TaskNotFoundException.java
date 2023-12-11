package com.fearwarden.tasks.exceptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException() {
        super("Task does not exist.");
    }
}
