package com.fearwarden.basemodule.exceptions.throwables;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException(String userId) {
        super("Token does not exist for the user: " + userId);
    }
}
