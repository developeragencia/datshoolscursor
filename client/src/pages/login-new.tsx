import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, User, Shield, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
  userType: z.enum(["client"]).default("client"),
});

// Register Schema
const registerSchema = z.object({
  username: z.string().min(3, "Username deve ter pelo menos 3 caracteres"),
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  planType: z.enum(["gratuito", "premium", "avancado", "monster"]),
  userType: z.enum(["client"]).default("client"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function LoginNew() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Login Form
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "client",
    },
  });

  // Register Form
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      planType: "gratuito",
      userType: "client",
    },
  });

  // Login Mutation
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
      
      // Always redirect to client dashboard
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

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      const { confirmPassword, ...registerData } = data;
      return apiRequest("/api/auth/register", "POST", registerData);
    },
    onSuccess: (data: any) => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Conta criada para ${data.firstName} ${data.lastName}. Fazendo login...`,
      });
      
      // Auto login after registration
      loginMutation.mutate({
        email: registerForm.getValues("email"),
        password: registerForm.getValues("password"),
        userType: registerForm.getValues("userType"),
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Falha ao criar conta",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  const handleRegister = (data: RegisterForm) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                  <circle cx="12" cy="8" r="3" opacity="0.3"/>
                  <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.9,1 3,1.9 3,3V21C3,22.1 3.9,23 5,23H19C20.1,23 21,22.1 21,21V9M19,9H14V4H5V21H19V9Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bueiro Digital</h1>
                <p className="text-sm text-gray-600">Sales Tracking Platform</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {activeTab === "login" ? "Entrar na Plataforma" : "Criar Nova Conta"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {activeTab === "login" 
                ? "Acesse seu dashboard e gerencie suas campanhas" 
                : "Junte-se à melhor plataforma de tracking do Brasil"
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-6">
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="userType">Tipo de Acesso</Label>
                    <Select 
                      value={loginForm.watch("userType")} 
                      onValueChange={(value) => loginForm.setValue("userType", "client")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de acesso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Cliente
                          </div>
                        </SelectItem>

                      </SelectContent>
                    </Select>
                    {loginForm.formState.errors.userType && (
                      <p className="text-sm text-red-600">{loginForm.formState.errors.userType.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        {...loginForm.register("email")}
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-red-600">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        {...loginForm.register("password")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-red-600">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-6">
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">


                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input
                      id="username"
                      placeholder="meuusername"
                      {...registerForm.register("username")}
                    />
                    {registerForm.formState.errors.username && (
                      <p className="text-sm text-red-600">{registerForm.formState.errors.username.message}</p>
                    )}
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        placeholder="João"
                        {...registerForm.register("firstName")}
                      />
                      {registerForm.formState.errors.firstName && (
                        <p className="text-sm text-red-600">{registerForm.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        placeholder="Silva"
                        {...registerForm.register("lastName")}
                      />
                      {registerForm.formState.errors.lastName && (
                        <p className="text-sm text-red-600">{registerForm.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        {...registerForm.register("email")}
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="text-sm text-red-600">{registerForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  {/* Plan Type */}
                  <div className="space-y-2">
                    <Label htmlFor="planType">Plano</Label>
                    <Select 
                      value={registerForm.watch("planType")} 
                      onValueChange={(value) => registerForm.setValue("planType", value as "gratuito" | "premium" | "avancado" | "monster")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gratuito">Gratuito - R$ 0/mês</SelectItem>
                        <SelectItem value="premium">Premium - R$ 97/mês</SelectItem>
                        <SelectItem value="avancado">Avançado - R$ 197/mês</SelectItem>
                        <SelectItem value="monster">Monster - R$ 497/mês</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Password Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="registerPassword">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="registerPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...registerForm.register("password")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-600">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...registerForm.register("confirmPassword")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-600">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="text-center">
            <div className="w-full space-y-4">
              <div className="text-sm text-gray-600">
                Ao {activeTab === "login" ? "entrar" : "se cadastrar"}, você concorda com nossos{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </Link>
              </div>
              
              <div className="text-sm text-gray-500">
                <Link href="/" className="text-blue-600 hover:underline">
                  ← Voltar para o site
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Developer Credits */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Desenvolvido por{" "}
            <a 
              href="https://wa.me/5587999272064" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Alex Developer
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}