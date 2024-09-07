package com.fearwarden.diaries.projects.exceptions.throwables;

public class ProjectDoesNotExistsException extends RuntimeException {
    public ProjectDoesNotExistsException(String projectId) {
        super("Project does not exists with id: " + projectId);
    }
}
