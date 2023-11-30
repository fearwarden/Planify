package com.fearwarden.basemodule.dto.request;

import com.fearwarden.basemodule.annotations.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDto {
    @NotNull(message = "Email is required.")
    @NotBlank
    @Email(message = "Invalid email.")
    private String email;
    @ValidPassword
    @NotBlank
    @NotNull(message = "Password is required.")
    private String password;
}
