import { useState, useEffect, useRef } from 'react';

interface Logo {
  src?: string;
  alt: string;
  isPlaceholder?: boolean;
  bgColor?: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  showGlow?: boolean;
}

export default function LogoCarousel({
  logos,
  speed = 30,
  pauseOnHover = true,
  className = '',
  showGlow = true,
}: LogoCarouselProps) {
  const [loopLogos, setLoopLogos] = useState<Logo[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [logosWidth, setLogosWidth] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    setLoopLogos([...logos, ...logos, ...logos]);
  }, [logos]);

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current && logosRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setLogosWidth(logosRef.current.scrollWidth / 3);
      }
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);

    return () => window.removeEventListener('resize', updateWidths);
  }, [loopLogos]);

  useEffect(() => {
    if (hovering || logosWidth === 0) return;

    const duration = (logosWidth / speed) * 1000;
    const startTime = performance.now();
    const startTranslate = translateX;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      const newTranslate = -logosWidth - (logosWidth * progress);
      
      setTranslateX(newTranslate);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hovering, logosWidth, speed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={() => pauseOnHover && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {showGlow && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent" />
        </>
      )}

      <div
        ref={logosRef}
        className="flex py-4 transition-transform"
        style={{
          transform: `translateX(${translateX}px)`,
          transitionDuration: hovering ? '0s' : '0.05s'
        }}
      >
        {loopLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex-shrink-0 mx-2 md:mx-4 flex items-center justify-center bg-white dark:bg-gray-800 p-3 md:p-4 rounded-md shadow-sm hover:shadow-md transition-all hover:scale-105"
            style={{
              minWidth: isMobile ? '130px' : '150px',
              height: isMobile ? '70px' : '80px'
            }}
          >
            {logo.isPlaceholder ? (
              <div
                className="h-10 md:h-12 w-28 md:w-36 rounded-md flex items-center justify-center text-white text-sm md:text-base font-semibold"
                style={{ background: logo.bgColor || 'linear-gradient(to right, #3b82f6, #2563eb)' }}
              >
                {logo.alt}
              </div>
            ) : (
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 md:h-12 max-w-full object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
