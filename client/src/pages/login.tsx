import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2, RocketIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [stars, setStars] = useState<{ id: string; top: string; left: string; width: string; height: string; opacity: number }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: `star-${i}-${Math.random()}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.7 + 0.3
    }));

    setStars(generatedStars);
    setMounted(true);

    // Verificar se há erro na URL (redirect do Google OAuth)
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    
    if (error) {
      const errorMessages: Record<string, string> = {
        'google_oauth_not_configured': 'Google OAuth não está configurado corretamente',
        'google_auth_failed': 'Falha na autenticação com Google',
        'no_code': 'Código de autorização não recebido',
        'token_fetch_failed': 'Falha ao obter tokens do Google',
        'token_exchange_failed': 'Falha na troca de tokens',
        'no_access_token': 'Token de acesso não recebido',
        'userinfo_fetch_failed': 'Falha ao buscar informações do usuário',
        'no_email': 'Email não fornecido pelo Google',
        'db_error': 'Erro ao acessar banco de dados',
        'user_creation_failed': 'Falha ao criar usuário',
        'session_error': 'Erro ao criar sessão',
        'google_auth_error': 'Erro no login com Google. Tente novamente.',
      };

      toast({
        title: "Erro no login com Google",
        description: errorMessages[error] || "Ocorreu um erro desconhecido",
        variant: "destructive",
      });

      // Limpar o parâmetro de erro da URL
      window.history.replaceState({}, '', '/login');
    }
  }, [toast]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      return apiRequest("/api/auth/login", "POST", data);
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(["/api/auth/me"], data);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta, ${data.firstName || data.username}!`,
      });
      
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-900 to-indigo-800 text-white relative overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-white/10" data-testid="button-back-home">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>

      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="absolute top-[15%] left-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 opacity-20 blur-md" />
      <div className="absolute bottom-[10%] right-[15%] w-60 h-60 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 opacity-20 blur-md" />

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-8 relative z-10">
        <div className="lg:w-2/5 flex flex-col items-center lg:items-start">
          <div className="relative h-48 w-48 mb-6">
            <div className="flex items-center justify-center h-full w-full relative">
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-blue-500/20 rounded-full ${mounted ? 'animate-pulse' : ''}`} />
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-indigo-500/20 rounded-full ${mounted ? 'animate-pulse' : ''}`} style={{ animationDelay: '1s' }} />

              <RocketIcon
                className={`text-white h-20 w-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${mounted ? 'animate-float' : ''}`}
              />

              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-14 bg-gradient-to-t from-orange-500 to-transparent rounded-full ${mounted ? 'animate-flame' : ''}`} />
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-center lg:text-left">Dashtools</h1>
          <p className="text-blue-100 mt-3 mb-6 text-center lg:text-left">A plataforma para rastreamento de UTM's</p>
        </div>

        <div className="lg:w-3/5 w-full max-w-md">
          <div className="bg-white shadow-xl rounded-2xl p-8 text-gray-900">
            <h2 className="text-2xl font-bold mb-6 text-center">Entrar na conta</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : 'border-gray-300'}
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('password')}
                      className={errors.password ? 'border-red-500' : 'border-gray-300'}
                      data-testid="input-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id="rememberMe" {...register('rememberMe')} />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                      Lembrar-me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-blue-600 hover:bg-blue-700" 
                disabled={loginMutation.isPending}
                data-testid="button-login"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                </div>
              </div>

              <a
                href="/api/auth/google"
                className="w-full h-11 flex items-center justify-center gap-3 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium">Entrar com Google</span>
              </a>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link href="/register" className="text-blue-600 hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                <p>Para fins de teste, use:</p>
                <p className="mt-1">Email: <span className="font-mono">admin@bueiro.digital</span></p>
                <p>Senha: <span className="font-mono">admin123</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted && (
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }

          .star {
            animation: twinkle linear infinite;
            animation-duration: calc(5s + (var(--i, 0) * 0.5s));
          }

          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-10px); }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes flame {
            0%, 100% { height: 14px; opacity: 0.8; }
            50% { height: 18px; opacity: 1; }
          }

          .animate-flame {
            animation: flame 0.5s ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  );
}
