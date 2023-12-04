package com.fearwarden.tasks.exceptions;

import com.fearwarden.tasks.exceptions.throwables.CategoryNotFoundException;
import com.fearwarden.tasks.exceptions.throwables.PriorityNotFoundException;
import com.fearwarden.tasks.exceptions.throwables.TaskNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TaskExceptionHandler {

    @ResponseBody
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<String> categoryNotFoundHandler(CategoryNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ResponseBody
    @ExceptionHandler(PriorityNotFoundException.class)
    public ResponseEntity<String> priorityNotFoundHandler(PriorityNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ResponseBody
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<String> taskNotFoundHandler(TaskNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
