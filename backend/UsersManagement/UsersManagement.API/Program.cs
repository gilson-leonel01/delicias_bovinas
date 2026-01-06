var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        var jwt = builder.Configuration.GetSection("Jwt").Get<Shared.Security.JwtSettings>()!;
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwt.Issuer,
            ValidAudience = jwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(jwt.Key))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddSingleton<Shared.Security.JwtSettings>(
builder.Configuration.GetSection("Jwt").Get<Shared.Security.JwtSettings>()!);
builder.Services.AddScoped<UsersManagement.Infrastructure.Repositories.UserRepository>();
builder.Services.AddScoped<UsersManagement.Application.Services.UserService>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();