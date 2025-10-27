// Sistema de Proteção de Código - Bueiro Digital
// Bloqueia DevTools mas mantém site funcionando normalmente

export class CodeProtection {
  private static instance: CodeProtection;
  private devToolsDetector: NodeJS.Timeout | null = null;
  private isProtectionActive = false;
  private devToolsOpen = false;

  public static getInstance(): CodeProtection {
    if (!CodeProtection.instance) {
      CodeProtection.instance = new CodeProtection();
    }
    return CodeProtection.instance;
  }

  // Inicializar proteções específicas para DevTools
  public initialize(): void {
    if (this.isProtectionActive) return;
    
    this.isProtectionActive = true;
    this.preventRightClick();
    this.disableKeyboardShortcuts();
    this.preventTextSelection();
    this.detectAndBlockDevTools();
    this.blockConsoleAccess();
  }

  // Detectar DevTools de forma mais sutil
  private detectAndBlockDevTools(): void {
    // Detecção menos agressiva por dimensões da janela
    this.devToolsDetector = setInterval(() => {
      const threshold = 200; // Threshold maior para evitar falsos positivos
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!this.devToolsOpen) {
          this.devToolsOpen = true;
          // Apenas recarregar a página, não fechar aba
          window.location.reload();
        }
      } else {
        this.devToolsOpen = false;
      }
    }, 2000); // Verificar a cada 2 segundos, não 100ms
  }



  // Obscurecer console de forma compatível
  private blockConsoleAccess(): void {
    // Interceptar métodos do console sem quebrar propriedades read-only
    const consoleMethods = ['log', 'warn', 'error', 'info', 'debug', 'trace'];
    
    consoleMethods.forEach(method => {
      if (typeof (console as any)[method] === 'function') {
        try {
          const original = (console as any)[method];
          (console as any)[method] = function() {
            // Em desenvolvimento, permitir logs
            if (window.location.hostname.includes('localhost') || process.env.NODE_ENV === 'development') {
              return original.apply(console, arguments);
            }
            // Em produção, não mostrar
            return;
          };
        } catch (e) {
          // Ignorar erros de propriedades read-only
        }
      }
    });
  }



  // Prevenir menu de contexto (botão direito)
  private preventRightClick(): void {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);
  }

  // Bloquear atalhos de teclado para DevTools
  private disableKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      // F12 - DevTools
      if (e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I - DevTools
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+J - Console
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+C - Inspect Element
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U - View Source
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S - Save Page
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // F5 - Refresh (permitir)
      // Ctrl+R - Refresh (permitir)
      // Outras teclas funcionam normalmente
    }, true);
  }



  // Prevenir seleção de texto em elementos sensíveis
  private preventTextSelection(): void {
    // Aplicar apenas quando necessário, não globalmente
    document.addEventListener('selectstart', (e) => {
      // Permitir seleção em inputs e textareas
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }
      
      // Bloquear seleção em outros elementos
      e.preventDefault();
      return false;
    }, true);

    // Prevenir drag and drop de elementos
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    }, true);
  }







  // Limpar proteções
  public cleanup(): void {
    if (this.devToolsDetector) {
      clearInterval(this.devToolsDetector);
      this.devToolsDetector = null;
    }
    this.isProtectionActive = false;
  }
}

// Inicializar proteção imediatamente
export function initializeCodeProtection(): void {
  const protection = CodeProtection.getInstance();
  
  // Inicializar o mais cedo possível
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      protection.initialize();
    });
  } else {
    protection.initialize();
  }

  // Garantir que funcione mesmo se a página já carregou
  setTimeout(() => {
    protection.initialize();
  }, 100);
}