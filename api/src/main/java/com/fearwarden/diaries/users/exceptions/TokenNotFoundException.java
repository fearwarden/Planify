package com.fearwarden.diaries.users.exceptions;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException() {
        super("Token does not exist.");
    }
}
