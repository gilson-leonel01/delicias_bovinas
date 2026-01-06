using Npgsql;

namespace Shared.Database;

public static class DatabaseConfig
{
    private static string ConnectionString = 
        "Host=localhost;Port=5432;Database=db_delicias_bovinas;Username=postgres;Password=admin;";

    public static NpgsqlConnection CreateConnection()
    {
        var conn = new NpgsqlConnection(ConnectionString);
        conn.Open();
        return conn;
    }
}