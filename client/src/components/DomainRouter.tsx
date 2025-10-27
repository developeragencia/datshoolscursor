import { useEffect, useState } from 'react';
import Home from '@/pages/home';

export default function DomainRouter() {
  const [currentDomain, setCurrentDomain] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      setCurrentDomain(hostname);
      console.log('Current domain:', hostname);
    }
  }, []);

  // Show regular home page for all domains (including alexdesenvolvedor.com.br)
  return <Home />;
}