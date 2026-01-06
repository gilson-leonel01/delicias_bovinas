namespace UsersManagement.Infrastructure.Repositories;

using Npgsql;
using Shared.Database;
using UsersManagement.Domain.Entities;
using UsersManagement.Domain.Enums;

public class UserRepository
{
    public async Task<User?> GetByEmailAsync(string email)
    {
        using var conn = DatabaseConfig.CreateConnection();
        var cmd = new NpgsqlCommand(
            @"SELECT id, email, password, name, role, created_at, updated_at 
              FROM ""User"" WHERE email = @email", conn);
        cmd.Parameters.AddWithValue("@email", email);

        using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync()) return null;

        return new User
        {
            Id = reader.GetInt32("id"),
            Email = reader.GetString("email"),
            PasswordHash = reader.GetString("password"),
            Name = reader.IsDBNull("name") ? null : reader.GetString("name"),
            Role = Enum.Parse<UserRole>(reader.GetString("role")),
            CreatedAt = reader.GetDateTime("created_at"),
            UpdatedAt = reader.GetDateTime("updated_at")
        };
    }

    public async Task<User> CreateAsync(User user)
    {
        using var conn = DatabaseConfig.CreateConnection();
        var cmd = new NpgsqlCommand(
            @"INSERT INTO ""User"" (email, password, name, role, created_at, updated_at) 
              VALUES (@email, @password, @name, @role, @created, @updated) 
              RETURNING id", conn);

        cmd.Parameters.AddWithValue("@email", user.Email);
        cmd.Parameters.AddWithValue("@password", user.PasswordHash);
        cmd.Parameters.AddWithValue("@name", (object?)user.Name ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@role", user.Role.ToString());
        cmd.Parameters.AddWithValue("@created", user.CreatedAt);
        cmd.Parameters.AddWithValue("@updated", user.UpdatedAt);

        user.Id = Convert.ToInt32(await cmd.ExecuteScalarAsync());
        return user;
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        using var conn = DatabaseConfig.CreateConnection();
        var cmd = new NpgsqlCommand(
            @"SELECT id, email, password, name, role, created_at, updated_at
            FROM ""User"" WHERE id = @id", conn);

        cmd.Parameters.AddWithValue("@id", id);

        using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync()) return null;

        return new User
        {
            Id = reader.GetInt32("id"),
            Email = reader.GetString("email"),
            PasswordHash = reader.GetString("password"),
            Name = reader.IsDBNull("name") ? null : reader.GetString("name"),
            Role = Enum.Parse<UserRole>(reader.GetString("role")),
            CreatedAt = reader.GetDateTime("created_at"),
            UpdatedAt = reader.GetDateTime("updated_at")
        };
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        using var conn = DatabaseConfig.CreateConnection();
        var cmd = new NpgsqlCommand(
            @"SELECT id, email, password, name, role, created_at, updated_at
            FROM ""User""", conn);

        using var reader = await cmd.ExecuteReaderAsync();
        var users = new List<User>();

        while (await reader.ReadAsync())
        {
            users.Add(new User
            {
                Id = reader.GetInt32("id"),
                Email = reader.GetString("email"),
                PasswordHash = reader.GetString("password"),
                Name = reader.IsDBNull("name") ? null : reader.GetString("name"),
                Role = Enum.Parse<UserRole>(reader.GetString("role")),
                CreatedAt = reader.GetDateTime("created_at"),
                UpdatedAt = reader.GetDateTime("updated_at")
            });
        }

        return users;
    }

    public async Task<bool> UpdateAsync(User user)
    {
        using var conn = DatabaseConfig.CreateConnection();
        var cmd = new NpgsqlCommand(
            @"UPDATE ""User""
            SET email = @email,
                password = @password,
                name = @name,
                role = @role,
                updated_at = @updated
            WHERE id = @id", conn);

        cmd.Parameters.AddWithValue("@id", user.Id);
        cmd.Parameters.AddWithValue("@email", user.Email);
        cmd.Parameters.AddWithValue("@password", user.PasswordHash);
        cmd.Parameters.AddWithValue("@name", (object?)user.Name ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@role", user.Role.ToString());
        cmd.Parameters.AddWithValue("@updated", user.UpdatedAt);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var conn = DatabaseConfig.CreateConnection();
        var cmd = new NpgsqlCommand(
            @"DELETE FROM ""User"" WHERE id = @id", conn);

        cmd.Parameters.AddWithValue("@id", id);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

}