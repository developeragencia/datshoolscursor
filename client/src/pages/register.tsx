import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Loader2, RocketIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const registerSchema = z.object({
  username: z.string().min(3, "Username deve ter pelo menos 3 caracteres"),
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string(),
  planType: z.enum(["gratuito", "premium", "avancado", "monster"]),
  terms: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar os termos e condições'
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  }, []);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      planType: "gratuito",
      terms: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      const { confirmPassword, terms, ...registerData } = data;
      return apiRequest("/api/auth/register", "POST", {
        ...registerData,
        userType: "client",
        planType: registerData.planType || "gratuito"
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Conta criada para ${data.firstName} ${data.lastName}. Redirecionando para login...`,
      });
      
      setTimeout(() => {
        setLocation("/login");
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Falha ao criar conta",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data);
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
          <p className="text-blue-100 mt-3 mb-6 text-center lg:text-left">Crie sua conta e comece a rastrear seus links</p>
        </div>

        <div className="lg:w-3/5 w-full max-w-md">
          <div className="bg-white shadow-xl rounded-2xl p-8 text-gray-900">
            <h2 className="text-2xl font-bold mb-6 text-center">Criar conta</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome de Usuário
                  </label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="seu_username"
                    autoComplete="username"
                    {...registerField('username')}
                    className={errors.username ? 'border-red-500' : 'border-gray-300'}
                    data-testid="input-username"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="João"
                      {...registerField('firstName')}
                      className={errors.firstName ? 'border-red-500' : 'border-gray-300'}
                      data-testid="input-firstName"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Sobrenome
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Silva"
                      {...registerField('lastName')}
                      className={errors.lastName ? 'border-red-500' : 'border-gray-300'}
                      data-testid="input-lastName"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...registerField('email')}
                    className={errors.email ? 'border-red-500' : 'border-gray-300'}
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="planType" className="block text-sm font-medium text-gray-700 mb-1">
                    Plano
                  </label>
                  <Select onValueChange={(value) => setValue('planType', value as any)} defaultValue="gratuito">
                    <SelectTrigger className={errors.planType ? 'border-red-500' : 'border-gray-300'} data-testid="select-planType">
                      <SelectValue placeholder="Selecione um plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gratuito">Gratuito</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                      <SelectItem value="monster">Monster</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.planType && (
                    <p className="text-red-500 text-xs mt-1">{errors.planType.message}</p>
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
                      autoComplete="new-password"
                      {...registerField('password')}
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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirme a senha
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...registerField('confirmPassword')}
                      className={errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
                      data-testid="input-confirmPassword"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      data-testid="button-toggle-confirm-password"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Controller
                      name="terms"
                      control={control}
                      render={({ field }) => (
                        <Checkbox 
                          id="terms" 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-terms"
                        />
                      )}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-700">
                      Aceito os{' '}
                      <Link href="/termos" className="text-blue-600 hover:underline">
                        termos e condições
                      </Link>
                    </label>
                    {errors.terms && (
                      <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-blue-600 hover:bg-blue-700" 
                disabled={registerMutation.isPending}
                data-testid="button-register"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  'Criar conta'
                )}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Faça login
                  </Link>
                </p>
              </div>
            </form>
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
