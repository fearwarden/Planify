package com.fearwarden.diaries.projects.exceptions.throwables;

public class InvalidMembersException extends RuntimeException {
    public InvalidMembersException() {
        super("Member does not exists.");
    }
}
