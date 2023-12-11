package com.fearwarden.diaries.users.utils;

import com.fearwarden.diaries.users.annotations.PasswordValueMatch;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapperImpl;

public class PasswordFieldsValueMatchValidator implements ConstraintValidator<PasswordValueMatch, Object> {

    private String field;
    private String fieldMatch;
    private String message;

    @Override
    public void initialize(PasswordValueMatch constraintAnnotation) {
        this.field = constraintAnnotation.field();
        this.fieldMatch = constraintAnnotation.fieldMatch();
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext context) {

        Object fieldValue = new BeanWrapperImpl(o).getPropertyValue(this.field);
        Object fieldMatchValue = new BeanWrapperImpl(o).getPropertyValue(this.fieldMatch);

        boolean isValid = false;
        if (fieldValue != null) {
            isValid = fieldValue.equals(fieldMatchValue);
        }

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context
                    .buildConstraintViolationWithTemplate(this.message)
                    .addPropertyNode(this.field)
                    .addConstraintViolation();

            context
                    .buildConstraintViolationWithTemplate(this.message)
                    .addPropertyNode(this.fieldMatch)
                    .addConstraintViolation();
        }

        return isValid;
    }
}
