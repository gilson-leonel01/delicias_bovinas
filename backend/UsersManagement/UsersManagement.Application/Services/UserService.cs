using UsersManagement.Application.DTOs;
using UsersManagement.Domain.Entities;
using UsersManagement.Domain.Enums;
using UsersManagement.Domain.Repositories;
using Shared.Security;
using UsersManagement.Domain.Security;

namespace UsersManagement.Application.Services;

public class UserService
{
    private readonly IUserRepository _repo;
    private readonly IPasswordHasher _passwordHasher;
    private readonly JwtSettings _jwtSettings;

    public UserService(
        IUserRepository repo,
        IPasswordHasher passwordHasher,
        JwtSettings jwtSettings)
    {
        _repo = repo;
        _passwordHasher = passwordHasher;
        _jwtSettings = jwtSettings;
    }

    public async Task<string> LoginAsync(string email, string password)
    {
        var user = await _repo.GetByEmailAsync(email)
            ?? throw new UnauthorizedAccessException("Credenciais inválidas");

        if (!_passwordHasher.Verify(password, user.PasswordHash))
            throw new UnauthorizedAccessException("Credenciais inválidas");

        return JwtTokenGenerator.GenerateToken(
            user.Id,
            user.Email,
            user.Role.ToString(),
            _jwtSettings
        );
    }

    public async Task<User> RegisterAsync(string email, string password, string? name = null)
    {
        var existing = await _repo.GetByEmailAsync(email);
        if (existing != null)
            throw new InvalidOperationException("Email já cadastrado");

        var user = new User
        {
            Email = email,
            PasswordHash = _passwordHasher.Hash(password),
            Name = name,
            Role = UserRole.Customer,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        return await _repo.CreateAsync(user);
    }

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return null;

        return new UserDto(
            user.Id,
            user.Email,
            user.Name,
            user.Role.ToString(),
            user.CreatedAt,
            user.UpdatedAt
        );
    }

    public async Task<PagedList<UserDto>> GetAllAsync(int page = 1, int pageSize = 10)
    {
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 10;
        if (pageSize > 100) pageSize = 100;

        var (users, total) = await _repo.GetAllAsync(page, pageSize);

        var dtos = users.Select(u => new UserDto(
            u.Id,
            u.Email,
            u.Name,
            u.Role.ToString(),
            u.CreatedAt,
            u.UpdatedAt
        ));

        return new PagedList<UserDto>(dtos, total, page, pageSize);
    }

    public async Task<bool> UpdateAsync(int id, UpdateUserRequest request)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return false;

        if (!string.IsNullOrWhiteSpace(request.Email) && request.Email != user.Email)
        {
            var emailExists = await _repo.GetByEmailAsync(request.Email);
            if (emailExists != null && emailExists.Id != id)
                throw new InvalidOperationException("Email já está em uso por outro usuário");
            
            user.Email = request.Email;
        }

        if (!string.IsNullOrWhiteSpace(request.Name))
            user.Name = request.Name;

        if (!string.IsNullOrWhiteSpace(request.NewPassword))
            user.PasswordHash = _passwordHasher.Hash(request.NewPassword);

        user.UpdatedAt = DateTime.UtcNow;

        await _repo.UpdateAsync(user);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return false;

        await _repo.DeleteAsync(id);
        return true;
    }
}