namespace Shared.Security;

public class JwtSettings
{
    public string Key { get; set; } = "N8lHNbqkBN9l85fVBUXId+A5/czQNrdVFMUgbpk9DWhx1wJ7NkAWbzKG4yNjwEBC";
    public string Issuer { get; set; } = "Ecommerce.Auth";
    public string Audience { get; set; } = "Ecommerce.Api";
    public int ExpirationMinutes { get; set; } = 1440;
}
