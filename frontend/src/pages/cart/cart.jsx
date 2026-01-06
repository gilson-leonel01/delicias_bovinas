import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Tag, Truck, CreditCard, MapPin, Phone, Mail } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Vazia (Coxão Duro)',
      category: 'Carne de Vaca',
      price: 46994.85,
      image: 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw48c548da/Produtos/745472-0000000039284-coxao%20duro%20bovino%20bife%20reserva%20bandeja%20kg-reserva-1.jpg',
      quantity: 2,
      discount: 20
    },
    {
      id: 2,
      name: 'Picanha Premium',
      category: 'Carne de Vaca',
      price: 89990.00,
      image: 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw48c548da/Produtos/745472-0000000039284-coxao%20duro%20bovino%20bife%20reserva%20bandeja%20kg-reserva-1.jpg',
      quantity: 1,
      discount: 15
    },
    {
      id: 3,
      name: 'Alcatra',
      category: 'Carne de Vaca',
      price: 65000.00,
      image: 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw48c548da/Produtos/745472-0000000039284-coxao%20duro%20bovino%20bife%20reserva%20bandeja%20kg-reserva-1.jpg',
      quantity: 3,
      discount: 10
    }
  ]);

  const formatPrice = (price) => {
    return `AO ${price.toLocaleString('pt-AO', { minimumFractionDigits: 3 })}`;
  };

  const calculateItemPrice = (item) => {
    const discountedPrice = item.price * (1 - item.discount / 100);
    return discountedPrice * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemPrice(item), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((sum, item) => {
      const discountAmount = (item.price * item.discount / 100) * item.quantity;
      return sum + discountAmount;
    }, 0);
  };

  const shippingFee = 5000;

  const calculateTotal = () => {
    return calculateSubtotal() + shippingFee;
  };

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-linear-to-r from-red-900 to-red-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href='/' className="hover:bg-red-800 p-2 rounded-lg transition">
                <ArrowLeft size={24} />
              </a>

              <div>
                <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
                <p className="text-red-200 mt-1">{cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho</p>
              </div>
            </div>
            <ShoppingCart size={40} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Produtos Selecionados</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex gap-6">
                      <div className="shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-lg shadow-md"
                        />
                      </div>

                      <div className="grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                          </div>

                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        {item.discount > 0 && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                              -{item.discount}% DESCONTO
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          <div>
                            {item.discount > 0 && (
                              <p className="text-sm text-gray-400 line-through">
                                {formatPrice(item.price)}
                              </p>
                            )}

                            <p className="text-2xl font-bold text-red-900">
                              {formatPrice(item.price * (1 - item.discount / 100))}
                              <span className="text-sm font-normal text-gray-600">/kg</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-red-100 hover:text-red-900 transition shadow-sm"
                            >
                              <Minus size={18} />
                            </button>

                            <span className="w-12 text-center font-bold text-lg">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-red-100 hover:text-red-900 transition shadow-sm"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Subtotal do item:</span>
                            <span className="text-xl font-bold text-gray-900">
                              {formatPrice(calculateItemPrice(item))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="bg-linear-to-r from-red-900 to-red-800 text-white px-6 py-4">
                <h2 className="text-xl font-bold">Resumo do Pedido</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>
                    <span className="font-semibold">{formatPrice(calculateSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>Descontos nos produtos</span>
                    <span className="font-semibold">-{formatPrice(calculateDiscount())}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      <Truck size={18} />
                      <span>Entrega</span>
                    </div>
                    <span className="font-semibold">{formatPrice(shippingFee)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-red-900">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>

                <button className="w-full bg-linear-to-r from-red-900 to-red-800 text-white py-4 rounded-lg font-bold text-lg hover:from-red-800 hover:to-red-700 transition shadow-lg flex items-center justify-center gap-2 mt-6">
                  <CreditCard size={24} />
                  Finalizar Compra
                </button>

                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Truck className="mx-auto text-red-900 mb-2" size={24} />
                    <p className="text-xs font-semibold text-gray-700">Entrega Rápida</p>
                  </div>

                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="mx-auto text-red-900 mb-2" size={24} />
                    <p className="text-xs font-semibold text-gray-700">Pagamento Seguro</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <h3 className="font-bold text-gray-900 mb-3">Precisa de ajuda?</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={18} className="text-red-900" />
                    <span>Bairro Popular, Rua Do Kilamba</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={18} className="text-red-900" />
                    <span>+244 978 620 789 / 123 456 789</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={18} className="text-red-900" />
                    <span>deliciasbovinas@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-white text-red-900 py-3 rounded-lg font-semibold border-2 border-red-900 hover:bg-red-50 transition flex items-center justify-center gap-2">
              <ArrowLeft size={20} />
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}