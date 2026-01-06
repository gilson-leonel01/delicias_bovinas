namespace UsersManagement.Application.Services;

using UsersManagement.Domain.Entities;
using UsersManagement.Infrastructure.Repositories;
using UsersManagement.Infrastructure.Security;
using Shared.Security;

public class UserService
{
    private readonly UserRepository _repo;
    private readonly JwtSettings _jwtSettings;

    public UserService(UserRepository repo, JwtSettings jwtSettings)
    {
        _repo = repo;
        _jwtSettings = jwtSettings;
    }

    public async Task<string> LoginAsync(string email, string password)
    {
        var user = await _repo.GetByEmailAsync(email) 
            ?? throw new UnauthorizedAccessException("Credenciais inválidas");

        if (!PasswordHasher.Verify(password, user.PasswordHash))
            throw new UnauthorizedAccessException("Credenciais inválidas");

        return JwtTokenGenerator.GenerateToken(user.Id, user.Email, user.Role.ToString(), _jwtSettings);
    }

    public async Task<User> RegisterAsync(string email, string password, string? name = null)
    {
        var existing = await _repo.GetByEmailAsync(email);
        if (existing != null) throw new InvalidOperationException("Email já cadastrado");

        var user = new User
        {
            Email = email,
            PasswordHash = PasswordHasher.Hash(password),
            Name = name,
            Role = UserRole.Customer,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        return await _repo.CreateAsync(user);
    }
}