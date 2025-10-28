import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Eye, EyeOff, UserPlus, Mail, Lock, User, Chrome, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const registerSchema = z.object({
  username: z.string().min(3, "Nome de usuário deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  planType: z.enum(["gratuito", "basico", "profissional", "empresa"]),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos",
  }),
});

type RegisterForm = z.infer<typeof registerSchema>;

const plans = [
  { value: "gratuito", label: "Gratuito", color: "from-gray-400 to-gray-600" },
  { value: "basico", label: "Básico", color: "from-blue-400 to-blue-600" },
  { value: "profissional", label: "Profissional", color: "from-purple-400 to-purple-600" },
  { value: "empresa", label: "Empresa", color: "from-orange-400 to-orange-600" },
];

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("gratuito");

  // Check if already logged in
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      planType: "gratuito",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await apiRequest("/api/auth/register", "POST", data);
      if (response) {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-2xl">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg bg-opacity-95">
          {/* Logo e Título */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Crie sua conta
            </h1>
            <p className="text-gray-600">
              Comece sua jornada conosco hoje
            </p>
          </div>

          {/* Erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Grid de 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome de Usuário */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nome de Usuário
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("username")}
                    type="text"
                    placeholder="seu_usuario"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Seleção de Plano */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Escolha seu plano
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {plans.map((plan) => (
                  <button
                    key={plan.value}
                    type="button"
                    onClick={() => {
                      setSelectedPlan(plan.value);
                      setValue("planType", plan.value as any);
                    }}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedPlan === plan.value
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${plan.color} mb-2 mx-auto`}></div>
                    <p className="text-sm font-semibold text-center">{plan.label}</p>
                    {selectedPlan === plan.value && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-5 h-5 text-purple-600" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <input type="hidden" {...register("planType")} />
            </div>

            {/* Termos */}
            <div className="flex items-start gap-3">
              <input
                {...register("acceptTerms")}
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Aceito os{" "}
                <span className="text-purple-600 font-medium cursor-pointer hover:underline">
                  termos de uso
                </span>{" "}
                e{" "}
                <span className="text-purple-600 font-medium cursor-pointer hover:underline">
                  política de privacidade
                </span>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
            )}

            {/* Botão Cadastrar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou cadastre-se com</span>
            </div>
          </div>

          {/* Google Signup */}
          <a
            href="/api/auth/google"
            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group"
          >
            <Chrome className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
            <span className="font-medium text-gray-700 group-hover:text-gray-900">
              Cadastrar com Google
            </span>
          </a>

          {/* Link para Login */}
          <div className="text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <button
                onClick={() => setLocation("/login")}
                className="text-purple-600 font-semibold hover:text-pink-600 transition-colors"
              >
                Fazer login
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2025 Dashtools. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

