package com.fearwarden.diaries.auth.exceptions;

import com.fearwarden.diaries.auth.exceptions.throwables.ForbiddenException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthenticationExceptionHandler {

    @ResponseBody
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<String> forbiddenHandler(ForbiddenException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

}
