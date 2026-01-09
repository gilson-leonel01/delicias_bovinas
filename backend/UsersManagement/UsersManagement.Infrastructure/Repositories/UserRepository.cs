namespace UsersManagement.Infrastructure.Repositories;

using Npgsql;
using Shared.Database;
using UsersManagement.Domain.Entities;
using UsersManagement.Domain.Enums;
using UsersManagement.Domain.Repositories;

public class UserRepository : IUserRepository
{

    private static User MapToUser(NpgsqlDataReader reader)
    {
        return new User
        {
            Id = reader.GetInt32(reader.GetOrdinal("id")),
            Email = reader.GetString(reader.GetOrdinal("email")),
            PasswordHash = reader.GetString(reader.GetOrdinal("password")),
            Name = reader.IsDBNull(reader.GetOrdinal("name")) ? null : reader.GetString(reader.GetOrdinal("name")),
            Role = Enum.Parse<UserRole>(reader.GetString(reader.GetOrdinal("role"))),
            CreatedAt = reader.GetDateTime(reader.GetOrdinal("createdAt")),
            UpdatedAt = reader.GetDateTime(reader.GetOrdinal("updatedAt"))
        };
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        await using var conn = DatabaseConfig.CreateConnection();
        await using var cmd = new NpgsqlCommand(
            @"SELECT id, email, password, name, role, ""createdAt"", ""updatedAt"" 
              FROM ""User"" WHERE email = @email", conn);

        cmd.Parameters.AddWithValue("@email", email);

        await using var reader = await cmd.ExecuteReaderAsync();
        return await reader.ReadAsync() ? MapToUser(reader) : null;
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        await using var conn = DatabaseConfig.CreateConnection();
        await using var cmd = new NpgsqlCommand(
            @"SELECT id, email, password, name, role, ""createdAt"", ""updatedAt"" 
              FROM ""User"" WHERE id = @id", conn);

        cmd.Parameters.AddWithValue("@id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        return await reader.ReadAsync() ? MapToUser(reader) : null;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        var users = new List<User>();

        await using var conn = DatabaseConfig.CreateConnection();
        await using var cmd = new NpgsqlCommand(
            @"SELECT id, email, password, name, role, ""createdAt"", ""updatedAt"" 
              FROM ""User""", conn);

        await using var reader = await cmd.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            users.Add(MapToUser(reader));
        }

        return users;
    }

    public async Task<User> CreateAsync(User user)
    {
        await using var conn = DatabaseConfig.CreateConnection();
        await using var cmd = new NpgsqlCommand(
            @"INSERT INTO ""User"" (email, password, name, role, ""createdAt"", ""updatedAt"") 
              VALUES (@email, @password, @name, @role, @created, @updated) 
              RETURNING id", conn);

        cmd.Parameters.AddWithValue("@email", user.Email);
        cmd.Parameters.AddWithValue("@password", user.PasswordHash);
        cmd.Parameters.AddWithValue("@name", (object?)user.Name ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@role", user.Role.ToString());
        cmd.Parameters.AddWithValue("@created", user.CreatedAt);
        cmd.Parameters.AddWithValue("@updated", user.UpdatedAt);

        var id = await cmd.ExecuteScalarAsync();
        user.Id = Convert.ToInt32(id);
        return user;
    }

    public async Task<bool> UpdateAsync(User user)
    {
        await using var conn = DatabaseConfig.CreateConnection();
        await using var cmd = new NpgsqlCommand(
            @"UPDATE ""User""
              SET email = @email,
                  password = @password,
                  name = @name,
                  role = @role,
                  ""updatedAt"" = @updated
              WHERE id = @id", conn);

        cmd.Parameters.AddWithValue("@id", user.Id);
        cmd.Parameters.AddWithValue("@email", user.Email);
        cmd.Parameters.AddWithValue("@password", user.PasswordHash);
        cmd.Parameters.AddWithValue("@name", (object?)user.Name ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@role", user.Role.ToString());
        cmd.Parameters.AddWithValue("@updated", DateTime.UtcNow);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await using var conn = DatabaseConfig.CreateConnection();
        await using var cmd = new NpgsqlCommand(
            @"DELETE FROM ""User"" WHERE id = @id", conn);

        cmd.Parameters.AddWithValue("@id", id);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    public async Task<(IEnumerable<User>, int)> GetAllAsync(int page, int pageSize)
    {
        var users = new List<User>();

        await using var conn = DatabaseConfig.CreateConnection();

        var countCmd = new NpgsqlCommand(@"SELECT COUNT(*) FROM ""User""", conn);
        var total = Convert.ToInt32(await countCmd.ExecuteScalarAsync());

        var cmd = new NpgsqlCommand(@"
            SELECT id, email, password, name, role, ""createdAt"", ""updatedAt""
            FROM ""User""
            ORDER BY id
            OFFSET @offset LIMIT @limit", conn);

        cmd.Parameters.AddWithValue("@offset", (page - 1) * pageSize);
        cmd.Parameters.AddWithValue("@limit", pageSize);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
            users.Add(MapToUser(reader));

        return (users, total);
    }

}