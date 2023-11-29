package com.fearwarden.basemodule;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.http.HttpResponse;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> validationHandler(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();

        String error = null;
        for (FieldError fieldError : fieldErrors) {
            error = fieldError.getDefaultMessage();
        }

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler(Throwable.class)
    public ResponseEntity<String> handleAllUnhandledExceptions(Throwable ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
