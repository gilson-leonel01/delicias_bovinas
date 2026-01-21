import { z } from 'zod';
import { useState } from 'react';
import logo from '../../assets/logo.avif';
import loggo from '../../assets/logo.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'Customer'
  });
  const [errors, setErrors] = useState({});

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.email) {
  //     newErrors.email = 'Email é obrigatório';
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = 'Email inválido';
  //   }

  //   if (!formData.password) {
  //     newErrors.password = 'Senha é obrigatória';
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
  //   }

  //   if (!isLogin) {
  //     if (!formData.name) {
  //       newErrors.name = 'Nome é obrigatório';
  //     }
  //     if (formData.password !== formData.confirmPassword) {
  //       newErrors.confirmPassword = 'As senhas não coincidem';
  //     }
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

    const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        console.log('Google token:', tokenResponse);

        await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: tokenResponse.access_token }),
        });

        alert('Login com Google realizado com sucesso!');
      },
      onError: () => {
        alert('Erro ao fazer login com Google');
      }
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isLogin) {
        console.log('Login:', { email: formData.email, password: formData.password });
        alert('Login realizado com sucesso!');
      } else {
        const userData = {
          email: formData.email,
          passwordHash: formData.password, 
          name: formData.name,
          role: formData.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        console.log('Registro:', userData);
        alert('Conta criada com sucesso!');
      }
    }
  };

  const baseSchema = z.object({
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Email inválido'),

    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),

    name: z.string().optional(),
    confirmPassword: z.string().optional(),
    role: z.string().optional(),
  });

  const registerSchema = baseSchema.superRefine((data, ctx) => {
    if (!data.name) {
      ctx.addIssue({
        path: ['name'],
        message: 'Nome é obrigatório',
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'As senhas não coincidem',
        code: z.ZodIssueCode.custom,
      });
    }
  });

  const loginSchema = baseSchema.pick({
    email: true,
    password: true,
  });

  const validateForm = () => {
    const schema = isLogin ? loginSchema : registerSchema;

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'Customer'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-red-900 to-red-800 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <img 
              src={logo} 
              alt="Delícias Bovinas Logo" 
              className="w-20 h-20 rounded-full mx-auto mb-4" 
            />

            <h1 className="text-4xl font-bold mb-4">Delícias Bovinas</h1>

            <p className="text-xl text-red-200 mb-8">
              A excelência e frescura em cada corte
            </p>

            <div className="space-y-4 text-left max-w-sm mx-auto">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="font-bold mb-1">Carnes Premium</h3>
                  <p className="text-red-200 text-sm">Cortes nobres da melhor carne sul-africana</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h3 className="font-bold mb-1">Entrega Rápida</h3>
                  <p className="text-red-200 text-sm">Receba seus produtos com segurança</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h3 className="font-bold mb-1">Preços Competitivos</h3>
                  <p className="text-red-200 text-sm">Descontos e promoções exclusivas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="md:hidden text-center mb-8">
            <img 
              src={loggo} 
              alt="Delícias Bovinas Logo" 
              className="w-20 h-20 rounded-full mx-auto mb-4" 
            />
            <h1 className="text-3xl font-bold text-red-900">Delícias Bovinas</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Criar conta'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Entre com suas credenciais para continuar' 
                : 'Preencha os dados para criar sua conta'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>

                {errors.name && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="******"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar Senha
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="******"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                  >
                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Conta
                </label>

                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                >
                  <option value="Customer">Cliente</option>
                  <option value="Admin">Administrador</option>
                </select>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-red-900 border-gray-300 rounded focus:ring-red-600"
                  />
                  <span className="text-sm text-gray-700">Lembrar-me</span>
                </label>

                <button
                  type="button"
                  className="text-sm text-red-900 hover:text-red-800 hover:cursor-pointer font-semibold"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-linear-to-r from-red-900 to-red-800 text-white py-4 rounded-xl font-bold text-lg hover:from-red-800 hover:to-red-700 hover:cursor-pointer transition shadow-lg flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
              <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              {' '}
              <button
                onClick={switchMode}
                className="text-red-900 font-bold hover:text-red-800 hover:cursor-pointer transition"
              >
                {isLogin ? 'Criar conta' : 'Entrar'}
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type='button'
                onClick={() => googleLogin()}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 hover:cursor-pointer transition font-semibold text-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 hover:cursor-pointer transition font-semibold text-gray-700">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}