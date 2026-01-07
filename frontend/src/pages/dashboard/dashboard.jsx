import React, { useState } from 'react';
import logo from '../../assets/logo.avif';
import { Users, Package, TrendingUp, DollarSign, Plus, Edit2, Trash2, Search, X } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Vazia (Coxão Duro)',
      category: 'Carne de Vaca',
      price: 46994.85,
      image: 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw48c548da/Produtos/745472-0000000039284-coxao%20duro%20bovino%20bife%20reserva%20bandeja%20kg-reserva-1.jpg',
      rating: 4,
      discount: 20,
      stock: 225
    },
    {
      id: 5,
      name: 'Picanha Premium',
      category: 'Carne de Vaca',
      price: 223541,
      image: 'https://labracemodena.it/wp-content/uploads/2024/08/blog.jpg',
      rating: 5,
      discount: null,
      stock: 45
    },
    {
      id: 4,
      name: 'Alcatra (Coxão)',
      category: 'Carne de Vaca',
      price: 29382.3,
      image: 'https://images.tcdn.com.br/img/img_prod/1074417/miolo_de_alcatra_resfriado_kg_297_1_ad1ec2bd877613282866150e21e0c811.jpg',
      rating: 5,
      discount: 10,
      stock: 120
    }
  ]);

  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Administrador', 
      email: 'admin@email.com', 
      role: 'Admin', 
      status: 'Ativo', 
      orders: null 
    },
    { 
      id: 2, 
      name: 'Maria Santos', 
      email: 'maria@email.com', 
      role: 'Cliente', 
      status: 'Ativo', 
      orders: 32 
    },
    { 
      id: 3, 
      name: 'Pedro Costa', 
      email: 'pedro@email.com', 
      role: 'Cliente', 
      status: 'Ativo', 
      orders: 78 
    },
    { 
      id: 4, 
      name: 'Paola Oliveira', 
      email: 'paola.o@email.com', 
      role: 'Cliente', 
      status: 'Inativo', 
      orders: 12 
    }
  ]);

  const stats = {
    totalProducts: products.length,
    totalUsers: users.length,
    totalRevenue: products.reduce((acc, p) => acc + p.price * p.stock, 0),
    activeOrders: 234
  };

  const formatPrice = (price) => {
    return `AO ${price.toLocaleString('pt-AO', { minimumFractionDigits: 3 })}`;
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Tem certeza que deseja eliminar este item?')) {
      if (type === 'product') {
        setProducts(products.filter(p => p.id !== id));
      } else {
        setUsers(users.filter(u => u.id !== id));
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-linear-to-r from-red-900 to-red-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className='flex gap-4'>
              <img src={logo} alt="Logo" className='w-14 h-14 rounded-full'/>
              <div className='flex-row gap-4'>
                <h1 className="text-3xl font-bold">Dashboard Delícias Bovinas</h1>
                <p className="text-red-200 mt-1">Gestão de Produtos e Usuários</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal('add', null)}
                className="bg-white text-red-900 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition flex items-center gap-2"
              >
                <Plus size={20} />
                Adicionar {activeTab === 'products' ? 'Produto' : 'Usuário'}
              </button>
            </div>
          </div>
        </div>
      </header>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Produtos</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
            </div>
            <Package className="text-red-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Usuários</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
            </div>
            <Users className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Receita Total</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{formatPrice(stats.totalRevenue)}</p>
            </div>
            <DollarSign className="text-green-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pedidos Ativos</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeOrders}</p>
            </div>
            <TrendingUp className="text-orange-600" size={40} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-8 py-4 font-semibold transition hover:cursor-pointer not-visited:${
                activeTab === 'products'
                  ? 'border-b-4 border-red-600 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Package className="inline mr-2" size={20} />
              Produtos
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`px-8 py-4 font-semibold transition hover:cursor-pointer ${
                activeTab === 'users'
                  ? 'border-b-4 border-red-600 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="inline mr-2" size={20} />
              Usuários
            </button>
          </nav>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Pesquisar ${activeTab === 'products' ? 'produtos' : 'usuários'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {activeTab === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Desconto</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Avaliação</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 rounded-lg object-cover" 
                        />
                        <span className="ml-4 font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {product.discount}%
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {product.stock} kg
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-medium text-gray-900">{product.rating}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => openModal('edit', product)}
                        className="text-blue-600 hover:text-blue-800 hover:cursor-pointer mr-4"
                      >
                        <Edit2 size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id, 'product')}
                        className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Função</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pedidos</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="ml-4 font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => openModal('edit', user)}
                        className="text-blue-600 hover:text-blue-800 hover:cursor-pointer mr-4"
                      >
                        <Edit2 size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(user.id, 'user')}
                        className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>

      {showModal && (
        <div className="fixed inset-0 bg-red-900 bg-opacity-20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalType === 'add' ? 'Adicionar' : 'Editar'} {activeTab === 'products' ? 'Produto' : 'Usuário'}
              </h2>

              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                {modalType === 'add' 
                  ? 'Preencha os campos abaixo para adicionar um novo item.' 
                  : 'Atualize as informações abaixo.'}
              </p>

              <div className="space-y-4">
                {activeTab === 'products' ? (
                  <>
                    <input 
                      type="text" 
                      placeholder="Nome do Produto" 
                      defaultValue={editingItem?.name} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                    />

                    <input 
                      type="text" 
                      placeholder="Categoria" 
                      defaultValue={editingItem?.category} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                    />

                    <input 
                      type="number" 
                      placeholder="Preço (AO)" 
                      defaultValue={editingItem?.price} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                    />

                    <input 
                      type="number" 
                      placeholder="Desconto (%)" 
                      defaultValue={editingItem?.discount} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                    />

                    <input 
                      type="number" 
                      placeholder="Stock (kg)" 
                      defaultValue={editingItem?.stock} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                    />

                    <input 
                      type="text" 
                      placeholder="URL da Imagem" 
                      defaultValue={editingItem?.image} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                    />
                  </>
                ) : (
                  <>
                    <input 
                      type="text" 
                      placeholder="Nome" 
                      defaultValue={editingItem?.name} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                    />

                    <input 
                      type="email" 
                      placeholder="Email" 
                      defaultValue={editingItem?.email} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                    />

                    <select 
                      defaultValue={editingItem?.role} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Selecione a Função</option>
                      <option value="Admin">Admin</option>
                      <option value="Gestor">Gestor</option>
                      <option value="Vendedor">Vendedor</option>
                      <option value="Cliente">Cliente</option>
                    </select>

                    <select 
                      defaultValue={editingItem?.status} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:cursor-pointer transition"
                >
                  Cancelar
                </button>

                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-800 hover:cursor-pointer transition"
                >
                  {modalType === 'add' ? 'Adicionar' : 'Atualizar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}