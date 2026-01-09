using Microsoft.AspNetCore.Mvc;
using UsersManagement.Application.Services;

namespace UsersManagement.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;

    public AuthController(UserService userService)
    {
        _userService = userService;
    }

    public record LoginRequest(string Email, string Password);
    public record RegisterRequest(string Email, string Password, string? Name);

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var token = await _userService.LoginAsync(req.Email, req.Password);
        return Ok(new { token });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {
        var user = await _userService.RegisterAsync(req.Email, req.Password, req.Name);
        return Created($"api/users/{user.Id}", user);
    }
}
