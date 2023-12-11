package com.fearwarden.diaries.tasks.exceptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException() {
        super("Task does not exist.");
    }
}
