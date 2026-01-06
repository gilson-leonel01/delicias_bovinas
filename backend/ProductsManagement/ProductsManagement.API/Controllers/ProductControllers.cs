using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProductsManagement.API.Controllers;

[ApiController]
[Route("api/products")]
[Authorize] 
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(new { message = "Lista de produtos" });

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok(new { id });

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult Create()
        => Ok(new { message = "Produto criado" });

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Update(int id)
        => Ok(new { message = $"Produto {id} atualizado" });

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Delete(int id)
        => Ok(new { message = $"Produto {id} removido" });

    [HttpGet("cart")]
    public IActionResult GetCart()
        => Ok(new { message = "Itens do carrinho" });

    [HttpPost("cart/{productId}")]
    public IActionResult AddToCart(int productId)
        => Ok(new { message = $"Produto {productId} adicionado ao carrinho" });

    [HttpDelete("cart/{productId}")]
    public IActionResult RemoveFromCart(int productId)
        => Ok(new { message = $"Produto {productId} removido do carrinho" });

    [HttpDelete("cart")]
    public IActionResult ClearCart()
        => Ok(new { message = "Carrinho limpo" });

        [HttpPost("orders")]
    public IActionResult CreateOrder()
        => Ok(new { message = "Pedido criado" });

    [HttpGet("orders")]
    public IActionResult GetMyOrders()
        => Ok(new { message = "Lista de pedidos do usuário" });

    [HttpGet("orders/{orderId}")]
    public IActionResult GetOrderById(int orderId)
        => Ok(new { orderId });

    [HttpPut("orders/{orderId}/cancel")]
    public IActionResult CancelOrder(int orderId)
        => Ok(new { message = $"Pedido {orderId} cancelado" });

        [HttpPost("reservations/{productId}")]
    public IActionResult CreateReservation(int productId)
        => Ok(new { message = $"Reserva criada para o produto {productId}" });

    [HttpGet("reservations")]
    public IActionResult GetMyReservations()
        => Ok(new { message = "Lista de reservas do usuário" });

    [HttpDelete("reservations/{reservationId}")]
    public IActionResult CancelReservation(int reservationId)
        => Ok(new { message = $"Reserva {reservationId} cancelada" });
}