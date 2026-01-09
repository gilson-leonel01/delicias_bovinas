namespace UsersManagement.Domain.Repositories;

using UsersManagement.Domain.Entities;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);
    Task<(IEnumerable<User> users, int total)> GetAllAsync(int page, int pageSize);
    Task<User?> GetByEmailAsync(string email);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> CreateAsync(User user);
    Task<bool> UpdateAsync(User user);
    Task<bool> DeleteAsync(int id);
}
