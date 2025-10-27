import { useState } from "react";

interface AnimatedLogoProps {
  variant?: "dark" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function AnimatedLogo({ 
  variant = "dark", 
  size = "md", 
  className = "" 
}: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-32 h-8",
    md: "w-40 h-10", 
    lg: "w-48 h-12"
  };

  const textColor = variant === "white" ? "#FFFFFF" : "#1F2937";
  const rocketColor = variant === "white" ? "#10B981" : "#3B82F6";

  return (
    <div 
      className={`logo-container inline-flex items-center gap-3 transition-all duration-300 ${
        isHovered ? "scale-105" : ""
      } ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Foguete Animado */}
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className={`transition-all duration-500 ${
            isHovered ? "animate-bounce" : ""
          }`}
          style={{
            transform: isHovered ? "translateY(-2px) rotate(5deg)" : "translateY(0) rotate(0deg)",
          }}
        >
          {/* Foguete */}
          <path
            d="M16 2L20 10H12L16 2Z"
            fill={rocketColor}
            className="transition-all duration-300"
          />
          <rect
            x="14"
            y="10"
            width="4"
            height="12"
            fill={rocketColor}
            className="transition-all duration-300"
          />
          
          {/* Janela do foguete */}
          <circle
            cx="16"
            cy="14"
            r="2"
            fill={variant === "white" ? "#1F2937" : "#FFFFFF"}
            className="transition-all duration-300"
          />
          
          {/* Aletas */}
          <path
            d="M12 18L10 22L14 20L12 18Z"
            fill="#EF4444"
            className="transition-all duration-300"
          />
          <path
            d="M20 18L22 22L18 20L20 18Z"
            fill="#EF4444"
            className="transition-all duration-300"
          />
          
          {/* Chamas animadas */}
          <g className={`transition-all duration-200 ${isHovered ? "opacity-100" : "opacity-60"}`}>
            <path
              d="M14 22L16 28L18 22"
              fill="#F59E0B"
              className={`animate-pulse ${isHovered ? "animate-bounce" : ""}`}
              style={{
                animationDelay: "0ms",
                transformOrigin: "16px 22px"
              }}
            />
            <path
              d="M15 24L16 30L17 24"
              fill="#EF4444"
              className={`animate-pulse ${isHovered ? "animate-bounce" : ""}`}
              style={{
                animationDelay: "100ms",
                transformOrigin: "16px 24px"
              }}
            />
          </g>
          
          {/* Partículas de fogo */}
          {isHovered && (
            <g className="animate-ping">
              <circle cx="12" cy="26" r="1" fill="#F59E0B" opacity="0.8" />
              <circle cx="20" cy="26" r="1" fill="#EF4444" opacity="0.8" />
              <circle cx="16" cy="29" r="1" fill="#F97316" opacity="0.8" />
            </g>
          )}
        </svg>
        
        {/* Efeito de rastro do foguete */}
        {isHovered && (
          <div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent opacity-70 animate-pulse"
            style={{
              filter: "blur(1px)",
              animation: "pulse 0.5s ease-in-out infinite"
            }}
          />
        )}
      </div>

      {/* Texto do Logo */}
      <div className="flex flex-col">
        <span 
          className="font-bold leading-tight transition-all duration-300"
          style={{ 
            color: textColor,
            fontSize: size === "sm" ? "16px" : size === "md" ? "18px" : "22px",
            textShadow: isHovered ? "0 0 10px rgba(59, 130, 246, 0.3)" : "none"
          }}
        >
          BUEIRO
        </span>
        <span 
          className="font-semibold leading-tight transition-all duration-300"
          style={{ 
            color: rocketColor,
            fontSize: size === "sm" ? "14px" : size === "md" ? "16px" : "18px",
            textShadow: isHovered ? "0 0 8px rgba(16, 185, 129, 0.3)" : "none"
          }}
        >
          DIGITAL
        </span>
      </div>
      
      {/* Efeito de glow geral */}
      {isHovered && (
        <div 
          className="absolute inset-0 -z-10 rounded-lg opacity-20 transition-opacity duration-300"
          style={{
            background: variant === "white" 
              ? "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
            filter: "blur(15px)"
          }}
        />
      )}
    </div>
  );
}