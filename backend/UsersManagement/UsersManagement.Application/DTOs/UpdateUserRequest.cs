namespace UsersManagement.Application.DTOs;

public record UpdateUserRequest(
    string? Name,
    string? Email,
    string? NewPassword
);