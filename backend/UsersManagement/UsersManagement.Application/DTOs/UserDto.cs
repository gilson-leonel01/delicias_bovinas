namespace UsersManagement.Application.DTOs;

public record UserDto(
    int Id,
    string Email,
    string? Name,
    string Role,
    DateTime CreatedAt,
    DateTime UpdatedAt
);