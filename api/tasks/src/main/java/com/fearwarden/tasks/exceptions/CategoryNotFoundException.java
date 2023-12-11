package com.fearwarden.tasks.exceptions;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException() {
        super("Category does not exist.");
    }
}
