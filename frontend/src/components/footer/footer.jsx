import logo from '../../assets/logo.avif';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="Delícias Bovinas Logo" 
                className="w-10 h-1o rounded-full"
              />

              <span className="font-bold text-lg">
                Delícias Bovinas
              </span>
            </div>

            <p className="text-red-200 text-sm">
              A excelência e frescura em cada corte que vai à sua mesa.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-red-200">
              <li><a href="#inicio" className="hover:text-white transition">Início</a></li>
              <li><a href="#produtos" className="hover:text-white transition">Produtos</a></li>
              <li><a href="#sobre" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#contactos" className="hover:text-white transition">Contactos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Informações</h4>
            <ul className="space-y-2 text-red-200">
              <li><a href="https://www.termsfeed.com/live/a4d7319b-c313-49df-a271-ab47b2426eec" className="hover:text-white transition">Política de Privacidade</a></li>
              <li><a href="https://www.termsfeed.com/live/b314f78e-4b6d-4de4-b598-f6b486a83e66" className="hover:text-white transition">Termos de Serviço</a></li>
              <li><a href="https://www.freeprivacypolicy.com/live/bf54a507-c273-4c27-b579-5e9aff800c42" className="hover:text-white transition">Política de Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-red-200 text-sm">
              <li>Bairro Popular, Rua Do Kibabo</li>
              <li>deliciasbovinas@gmail.com</li>
              <li>+244 929 626 961</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-red-900 pt-8 text-center text-red-200 text-sm">
          <p>
            &copy; <span>{currentYear} </span>
            FLAMES Inc. Todos os direitos reservados &reg;
          </p>
        </div>
      </div>
    </footer>
  );
};