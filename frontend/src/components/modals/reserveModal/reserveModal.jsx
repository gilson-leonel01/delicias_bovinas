import { useState } from 'react';

export default function ReserveModal({ isOpen, onClose, isAuthenticated, onLoginRequired }) {
  const [formData, setFormData] = useState({
    product: '',
    quantity: 1,
    date: '',
    notes: ''
  });

  const handleSubmit = () => {
    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }
    alert('Reserva realizada com sucesso! Entraremos em contato.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-red-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="bg-linear-to-r from-red-900 to-red-800 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">Fazer Reserva</h2>
            <p className="text-red-200 text-sm mt-1">Reserve seus produtos com antecedência</p>
          </div>

          <button onClick={onClose} className="text-white hover:bg-red-800 p-2 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Calendar size={18} />
              O que é uma reserva?
            </h4>
            
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Garanta disponibilidade do produto</li>
              <li>• Confirmaremos por telefone/email</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Produto Desejado *
              </label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="">Selecione o produto</option>
                <option value="picanha">Picanha Premium</option>
                <option value="file-mignon">Filé Mignon</option>
                <option value="alcatra">Alcatra</option>
                <option value="outro">Outro (especificar nas observações)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantidade (kg) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Data Prevista para Retirada *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows="3"
                placeholder="Ex: corte específico, espessura, etc."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mt-6">
              <p className="text-yellow-800 text-sm font-semibold">
                ⚠️ É necessário fazer login para confirmar a reserva
              </p>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-800 transition"
            >
              {isAuthenticated ? 'Confirmar Reserva' : 'Fazer Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}