package com.fearwarden.coremodule;

import com.fearwarden.basemodule.exceptions.ConfirmPasswordException;
import com.fearwarden.basemodule.exceptions.TokenNotFoundException;
import com.fearwarden.basemodule.exceptions.UserExistException;
import com.fearwarden.basemodule.exceptions.UserNotFoundException;
import com.fearwarden.tasks.exceptions.CategoryNotFoundException;
import com.fearwarden.tasks.exceptions.PriorityNotFoundException;
import com.fearwarden.tasks.exceptions.TaskNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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
