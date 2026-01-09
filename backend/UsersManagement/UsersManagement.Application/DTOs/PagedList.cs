namespace UsersManagement.Application.DTOs;

public record PagedList<T>(
    IEnumerable<T> Items,
    int TotalCount,
    int Page,
    int PageSize
);