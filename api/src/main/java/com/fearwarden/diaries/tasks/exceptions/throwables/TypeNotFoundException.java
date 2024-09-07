package com.fearwarden.diaries.tasks.exceptions.throwables;

public class TypeNotFoundException extends RuntimeException {
    public TypeNotFoundException() {
        super("Type not found.");
    }
}
