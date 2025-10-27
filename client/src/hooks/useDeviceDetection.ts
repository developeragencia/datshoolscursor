import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPWA: boolean;
  screenWidth: number;
  screenHeight: number;
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isPWA: false,
    screenWidth: 0,
    screenHeight: 0
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;
      
      // Check if PWA
      const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                   (window.navigator as any).standalone ||
                   document.referrer.includes('android-app://');
      
      // Mobile detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
                      width < 768;
      
      // Tablet detection
      const isTablet = (/iPad|Android/i.test(userAgent) && width >= 768 && width < 1024) ||
                      (width >= 768 && width < 1024);
      
      // Desktop detection
      const isDesktop = width >= 1024 && !isMobile;

      setDeviceInfo({
        isMobile: isMobile && !isTablet,
        isTablet,
        isDesktop,
        isPWA,
        screenWidth: width,
        screenHeight: height
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return deviceInfo;
}