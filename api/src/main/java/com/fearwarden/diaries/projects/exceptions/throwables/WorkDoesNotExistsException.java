package com.fearwarden.diaries.projects.exceptions.throwables;

public class WorkDoesNotExistsException extends RuntimeException {
    public WorkDoesNotExistsException(String workId) {
        super("Work does not exist with id: " + workId);
    }
}
