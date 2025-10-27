import { useEffect } from 'react';

export function useCodeProtection() {
  useEffect(() => {
    // Additional runtime protection
    const protectRuntime = () => {
      // Disable source viewing
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
          e.preventDefault();
          return false;
        }
      });

      // Block iframe embedding
      if (window !== window.top) {
        window.top!.location = window.location;
      }

      // Disable drag and drop
      document.addEventListener('dragover', (e) => e.preventDefault());
      document.addEventListener('drop', (e) => e.preventDefault());

      // Monitor for DevTools
      let devtools = false;
      const detection = setInterval(() => {
        const before = Date.now();
        console.clear();
        const after = Date.now();
        
        if (after - before > 100) {
          devtools = true;
          clearInterval(detection);
          
          // Show warning
          document.body.innerHTML = `
            <div style="
              position: fixed; top: 0; left: 0; 
              width: 100%; height: 100%; 
              background: #000; color: #fff; 
              display: flex; align-items: center; 
              justify-content: center; z-index: 999999;
              font-family: Arial, sans-serif;
            ">
              <div style="text-align: center;">
                <h1>🔒 Área Protegida</h1>
                <p>Este site possui proteção contra inspeção de código.</p>
                <p>Feche as ferramentas de desenvolvedor para continuar.</p>
              </div>
            </div>
          `;
        }
      }, 1000);
    };

    protectRuntime();
  }, []);
}