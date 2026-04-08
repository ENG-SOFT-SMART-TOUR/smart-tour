package backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank @Size(min = 2, message = "Name must have at least 2 characters") private String name;
    @Email @NotBlank private String email;
    @NotBlank @Size(min = 8, message = "Password must have at least 8 characters") private String password;
}
