package com.fearwarden.diaries.projects.exceptions;

import com.fearwarden.diaries.projects.exceptions.throwables.InvalidMembersException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ProjectExceptionHandler {

    @ResponseBody
    @ExceptionHandler(InvalidMembersException.class)
    public ResponseEntity<String> invalidMemberHandler(InvalidMembersException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
