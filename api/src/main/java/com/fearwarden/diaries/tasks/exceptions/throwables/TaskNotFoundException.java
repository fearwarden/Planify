package com.fearwarden.diaries.tasks.exceptions.throwables;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException() {
        super("Task does not exist.");
    }
}
