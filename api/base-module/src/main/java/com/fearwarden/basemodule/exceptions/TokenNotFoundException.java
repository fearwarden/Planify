package com.fearwarden.basemodule.exceptions;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException() {
        super("Token does not exist.");
    }
}
