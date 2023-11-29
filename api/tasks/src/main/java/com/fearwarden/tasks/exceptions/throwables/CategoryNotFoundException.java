package com.fearwarden.tasks.exceptions.throwables;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException() {
        super("Category does not exist.");
    }
}
