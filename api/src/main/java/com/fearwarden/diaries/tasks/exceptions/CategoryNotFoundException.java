package com.fearwarden.diaries.tasks.exceptions;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException() {
        super("Category does not exist.");
    }
}
