namespace ProductsManagement.Application.Services;

using ProductsManagement.Domain.Entities;
using ProductsManagement.Domain.Repositories;

public class ProductService
{
    private readonly IProductRepository _repo;

    public ProductService(IProductRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<Product>> GetAllAsync()
        => _repo.GetAllAsync();

    public Task<Product?> GetByIdAsync(int id)
        => _repo.GetByIdAsync(id);
}
