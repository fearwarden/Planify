package com.fearwarden.basemodule.exceptions.throwables;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException() {
        super("Token does not exist.");
    }
}
