package com.fearwarden.basemodule.dto.request;

import com.fearwarden.basemodule.annotations.PasswordValueMatch;
import com.fearwarden.basemodule.annotations.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@PasswordValueMatch.List({
        @PasswordValueMatch(
                field = "password",
                fieldMatch = "confirmationPassword",
                message = "Password do not match!"
        )
})
@Data
public class RegisterDto {
    @NotNull(message = "Email is required.")
    @NotBlank
    @Email(message = "Invalid email.")
    private String email;

    @NotNull(message = "First name is required.")
    @NotBlank
    private String firstName;

    @NotNull(message = "Last name is required.")
    @NotBlank
    private String lastName;

    @ValidPassword
    @NotNull(message = "Password is required.")
    @NotBlank
    private String password;

    @ValidPassword
    @NotNull(message = "Confirmation password is required.")
    @NotBlank
    private String confirmationPassword;
}
