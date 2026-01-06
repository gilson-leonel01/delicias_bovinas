using BCrypt.Net;

namespace UsersManagement.Infrastructure.Security;

public static class PasswordHasher
{
    public static string Hash(string password) => BCrypt.HashPassword(password);
    public static bool Verify(string password, string hash) => BCrypt.Verify(password, hash);
}