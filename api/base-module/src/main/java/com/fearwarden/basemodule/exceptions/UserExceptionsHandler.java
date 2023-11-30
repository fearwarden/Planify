package com.fearwarden.basemodule.exceptions;

import com.fearwarden.basemodule.exceptions.throwables.ConfirmPasswordException;
import com.fearwarden.basemodule.exceptions.throwables.TokenNotFoundException;
import com.fearwarden.basemodule.exceptions.throwables.UserExistException;
import com.fearwarden.basemodule.exceptions.throwables.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserExceptionsHandler {

    @ResponseBody
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> userNotFoundHandler(UserNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ResponseBody
    @ExceptionHandler(UserExistException.class)
    public ResponseEntity<String> userExistHandler(UserExistException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ResponseBody
    @ExceptionHandler(ConfirmPasswordException.class)
    public ResponseEntity<String> confirmationPasswordHandler(ConfirmPasswordException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ResponseBody
    @ExceptionHandler(TokenNotFoundException.class)
    public ResponseEntity<String> tokeNotFoundHandler(TokenNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
