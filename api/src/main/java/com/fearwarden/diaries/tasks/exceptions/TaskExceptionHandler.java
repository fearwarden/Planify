package com.fearwarden.diaries.tasks.exceptions;

import com.fearwarden.diaries.tasks.exceptions.throwables.*;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TaskExceptionHandler {

    @ResponseBody
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<String> taskNotFoundHandler(TaskNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
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
    @ExceptionHandler(InvalidCompleteStatusException.class)
    public ResponseEntity<String> invalidCompleteStatusHandler(InvalidCompleteStatusException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler(TypeNotFoundException.class)
    public ResponseEntity<String> typeNotFoundHandler(TypeNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
