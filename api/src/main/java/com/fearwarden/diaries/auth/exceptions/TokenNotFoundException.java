package com.fearwarden.diaries.auth.exceptions;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException() {
        super("Token does not exist.");
    }
}
