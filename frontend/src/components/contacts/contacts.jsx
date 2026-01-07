import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() { 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contactos" className="py-16 bg-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Contactos
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Entre em contacto
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="text"
                placeholder="Localização"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <textarea
                placeholder="Descrição"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <button 
                onClick={handleSubmit} 
                className="w-full bg-white text-red-900 py-3 rounded-lg hover:bg-red-100 hover:cursor-pointer transition font-semibold"
              >
                Enviar
              </button>
            </div>
          </div>

          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Telefone</h4>
                  <a href="callto:+244929626961">+244 929 626 961</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <a href='mailto:deliciasbovinas@gmail.com'>deliciasbovinas@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Localização</h4>
                  <p>Bairro Popular, Rua Do Kibabo</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl h-64 mt-6 mr-18 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.4062176708035!2d13.257972273117627!3d-8.841718590528306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f39c7c291935%3A0x8d80e7e4f631a68f!2sKibabo%20Popula!5e0!3m2!1spt-PT!2sao!4v1767705362558!5m2!1spt-PT!2sao"
                width="500"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kibabo Popula Map"
                className="rounded-2xl h-64 flex items-center justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
