package com.fearwarden.diaries;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestControllerAdvice
@Order()
public class GlobalExceptionHandler {
    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> validationHandler(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        String error = fieldErrors.stream()
                .reduce((first, second) -> second) // get the last element in the stream and then get the default message
                .map(FieldError::getDefaultMessage)
                .orElse(null);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException ex) {
        System.out.println(ex.getClass().getSimpleName());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
    }

    // TODO: this handler is called before anyone else, debug why

//    @ResponseBody
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<Void> handleAllUnhandledExceptions(Exception ex) {
//        return ResponseEntity.internalServerError().build();
//    }
}
