// ULTIMATE CODE PROTECTION SYSTEM
// COMPLETELY BLOCKS ALL DEVELOPER TOOLS AND CODE INSPECTION

(function() {
  'use strict';

  // DISABLE CONSOLE QUIETLY
  const disableConsole = () => {
    try {
      // Override console methods silently
      const methods = ['log', 'warn', 'error', 'info', 'debug', 'trace', 'dir', 'dirxml', 'table', 'assert', 'clear', 'profile', 'profileEnd'];
      
      methods.forEach(method => {
        if (window.console && window.console[method]) {
          window.console[method] = function() {};
        }
      });
    } catch(e) {
      // Ignore errors
    }
  };

  // BLOCK ONLY DEVELOPER SHORTCUTS
  const blockDevShortcuts = (e) => {
    // F12 - DevTools
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+I (Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.keyCode === 85 || e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      return false;
    }
  };

  // Block right-click context menu
  const blockRightClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // MULTIPLE DevTools detection methods
  const detectDevTools = () => {
    // Method 1: Timing attack
    const start = performance.now();
    debugger;
    const end = performance.now();
    
    if (end - start > 100) {
      triggerSecurityAlert();
      return;
    }

    // Method 2: Console detection
    let devtools = false;
    const el = new Image();
    Object.defineProperty(el, 'id', {
      get: function() {
        devtools = true;
        triggerSecurityAlert();
      }
    });
    console.log(el);

    // Method 3: Window size detection
    const threshold = 160;
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      triggerSecurityAlert();
    }
  };

  // SECURITY ALERT SYSTEM
  const triggerSecurityAlert = () => {
    // Immediately destroy page content
    destroyPage();
    
    // Show security warning
    showSecurityWarning();
    
    // Additional security measures
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  // DESTROY PAGE COMPLETELY
  const destroyPage = () => {
    // Remove all content
    if (document.body) {
      document.body.innerHTML = '';
    }
    if (document.head) {
      const scripts = document.head.querySelectorAll('script');
      scripts.forEach(script => script.remove());
    }
    
    // Clear all intervals and timeouts
    const highestId = setTimeout(function(){}, 1);
    for (let i = 0; i < highestId; i++) {
      clearTimeout(i);
      clearInterval(i);
    }
  };

  // SHOW MAXIMUM SECURITY WARNING
  const showSecurityWarning = () => {
    const warningHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>ACESSO NEGADO</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Arial', sans-serif; 
            background: #000; 
            color: #fff; 
            overflow: hidden;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
          .container {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(45deg, #ff0000, #8b0000, #000);
            background-size: 400% 400%;
            animation: gradient 3s ease infinite;
            z-index: 999999999999;
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .warning {
            text-align: center;
            max-width: 600px;
            padding: 40px;
            border: 3px solid #ff0000;
            border-radius: 15px;
            background: rgba(0,0,0,0.9);
            box-shadow: 0 0 50px #ff0000;
          }
          .icon {
            font-size: 100px;
            margin-bottom: 30px;
            animation: pulse 1s infinite;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          h1 {
            font-size: 48px;
            margin-bottom: 20px;
            color: #ff0000;
            text-shadow: 0 0 20px #ff0000;
            animation: glow 2s ease-in-out infinite alternate;
          }
          @keyframes glow {
            from { text-shadow: 0 0 20px #ff0000; }
            to { text-shadow: 0 0 30px #ff0000, 0 0 40px #ff0000; }
          }
          p {
            font-size: 20px;
            margin-bottom: 15px;
            line-height: 1.6;
          }
          .warning-text {
            color: #ffff00;
            font-weight: bold;
            font-size: 24px;
          }
          button {
            margin-top: 30px;
            padding: 15px 40px;
            font-size: 18px;
            background: #ff0000;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
          }
          button:hover {
            background: #cc0000;
            transform: scale(1.05);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="warning">
            <div class="icon">⚠️🔒⚠️</div>
            <h1>ACESSO NEGADO</h1>
            <p class="warning-text">VIOLAÇÃO DE SEGURANÇA DETECTADA!</p>
            <p>Tentativa de acesso não autorizado às ferramentas de desenvolvimento foi bloqueada.</p>
            <p>Este site possui proteção avançada contra inspeção de código.</p>
            <p><strong>AÇÃO REQUERIDA:</strong></p>
            <p>1. Feche TODAS as ferramentas de desenvolvedor</p>
            <p>2. Feche o console do navegador</p>
            <p>3. Recarregue a página</p>
            <button onclick="window.location.reload()">RECARREGAR PÁGINA</button>
          </div>
        </div>
        <script>
          // Block any attempts to access developer tools
          document.addEventListener('keydown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
          }, true);
          
          document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
          }, true);
          
          // Auto-reload after 10 seconds
          setTimeout(function() {
            window.location.reload();
          }, 10000);
        </script>
      </body>
      </html>
    `;
    
    document.open();
    document.write(warningHTML);
    document.close();
  };

  // Detect viewport changes (DevTools opening)
  const detectViewportChanges = () => {
    let lastInnerWidth = window.innerWidth;
    let lastInnerHeight = window.innerHeight;
    
    setInterval(() => {
      const currentInnerWidth = window.innerWidth;
      const currentInnerHeight = window.innerHeight;
      
      // Check if viewport changed significantly (DevTools opened)
      if (Math.abs(currentInnerWidth - lastInnerWidth) > 200 || 
          Math.abs(currentInnerHeight - lastInnerHeight) > 200) {
        if (window.outerWidth - window.innerWidth > 200 || 
            window.outerHeight - window.innerHeight > 200) {
          showAccessDenied();
        }
      }
      
      lastInnerWidth = currentInnerWidth;
      lastInnerHeight = currentInnerHeight;
    }, 1000);
  };

  // Block text selection
  const blockSelection = () => {
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });
    
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });
  };

  // Hide React and framework signatures
  const hideFrameworkSignatures = () => {
    // Hide React DevTools
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = undefined;
    }

    // Hide Redux DevTools
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      window.__REDUX_DEVTOOLS_EXTENSION__ = undefined;
    }

    // Remove data attributes that reveal framework
    setTimeout(() => {
      const elements = document.querySelectorAll('[data-reactroot], [data-react-helmet], [data-vite-dev-id]');
      elements.forEach(el => {
        Array.from(el.attributes).forEach(attr => {
          if (attr.name.startsWith('data-react') || 
              attr.name.startsWith('data-vite') ||
              attr.name.startsWith('data-hot')) {
            el.removeAttribute(attr.name);
          }
        });
      });
    }, 2000);
  };

  // MAXIMUM SECURITY INITIALIZATION
  const initMaximumSecurity = () => {
    // Basic protection options
    disableConsole();
    nukeDevTools();
    
    // Event listeners for developer tools only
    document.addEventListener('keydown', blockDevShortcuts, true);
    document.addEventListener('contextmenu', blockRightClick, true);
    document.addEventListener('dragstart', blockDragAndDrop, true);
    
    // Window event monitoring
    window.addEventListener('resize', detectDevTools);
    window.addEventListener('focus', detectDevTools);
    window.addEventListener('blur', detectDevTools);
    
    // Hide all framework signatures
    hideFrameworkSignatures();
    
    // Continuous monitoring
    setInterval(detectDevTools, 500);
    setInterval(checkForDevTools, 1000);
    setInterval(monitorWindow, 100);
    
    // Additional protection layers
    setTimeout(hideFrameworkSignatures, 1000);
    setTimeout(removeSourceMaps, 2000);
    setTimeout(obfuscateDOM, 3000);
  };

  // NUKE ALL DEVELOPER TOOLS FUNCTIONS
  const nukeDevTools = () => {
    // Disable debugging functions
    try {
      window.eval = function() { return null; };
      window.Function = function() { return null; };
    } catch(e) {}
    
    // Block common debugging objects (safe approach)
    const blockedObjects = ['__REACT_DEVTOOLS_GLOBAL_HOOK__', '__REDUX_DEVTOOLS_EXTENSION__'];
    blockedObjects.forEach(obj => {
      try {
        if (window[obj]) {
          delete window[obj];
        }
        Object.defineProperty(window, obj, {
          get: () => { return undefined; },
          set: () => { return false; },
          configurable: false
        });
      } catch(e) {
        // Some properties can't be deleted, ignore errors
      }
    });
  };

  // BLOCK RIGHT-CLICK CONTEXT MENU
  const blockRightClick = (e) => {
    e.preventDefault();
    return false;
  };

  // ALLOW NORMAL SELECTION BUT BLOCK SOME ACTIONS
  const blockDragAndDrop = (e) => {
    if (e.type === 'dragstart') {
      e.preventDefault();
      return false;
    }
  };

  // ADVANCED DevTools DETECTION
  const checkForDevTools = () => {
    try {
      // Check for DevTools indicators (safe approach)
      if (window.outerHeight && window.outerWidth) {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
          triggerSecurityAlert();
        }
      }
      
      // Check for console access attempts
      if (typeof window.console !== 'undefined' && window.console.clear) {
        triggerSecurityAlert();
      }
    } catch(e) {
      // Ignore detection errors
    }
  };

  // MONITOR WINDOW CHANGES
  const monitorWindow = () => {
    // Detect rapid window size changes (DevTools opening/closing)
    const currentTime = Date.now();
    if (window._lastCheck && currentTime - window._lastCheck < 50) {
      return;
    }
    window._lastCheck = currentTime;
    
    if (window.innerWidth < 500 || window.innerHeight < 300) {
      // Window too small, might be DevTools open
      triggerSecurityAlert();
    }
  };

  // REMOVE SOURCE MAPS AND DEBUGGING INFO
  const removeSourceMaps = () => {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.src && (script.src.includes('map') || script.src.includes('dev'))) {
        script.remove();
      }
    });
    
    // Remove sourcemap comments
    const allText = document.documentElement.innerHTML;
    if (allText.includes('sourceMappingURL') || allText.includes('sourceURL')) {
      document.documentElement.innerHTML = allText
        .replace(/\/\/# sourceMappingURL=.*/g, '')
        .replace(/\/\/# sourceURL=.*/g, '');
    }
  };

  // OBFUSCATE DOM STRUCTURE
  const obfuscateDOM = () => {
    // Remove data attributes that reveal framework
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('data-react') || 
            attr.name.startsWith('data-vite') ||
            attr.name.startsWith('data-hot') ||
            attr.name.includes('dev')) {
          el.removeAttribute(attr.name);
        }
      });
    });
  };

  // START MAXIMUM SECURITY IMMEDIATELY
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMaximumSecurity);
  } else {
    initMaximumSecurity();
  }
  
  // Emergency activation
  initMaximumSecurity();

})();