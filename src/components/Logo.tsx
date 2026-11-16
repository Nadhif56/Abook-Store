import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export function Logo({ className = "", size = "md", withText = true }: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  const subTextSizes = {
    sm: "text-[9px]",
    md: "text-[11px]",
    lg: "text-xs",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Icon: Initial 'A' stylized with open book pages */}
      <div
        className={`${iconSizes[size]} shrink-0 relative flex items-center justify-center rounded-xl bg-gradient-to-br from-espresso-deep to-primary p-2 shadow-subtle text-ivory-bright`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Stylized Apex of 'A' */}
          <path
            d="M24 7L38 38H31.5L28.2 30.5H19.8L16.5 38H10L24 7Z"
            fill="none"
            stroke="#FAF7F2"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner Open Book crossbar */}
          <path
            d="M17 28C19 26 21.5 25 24 25.5C26.5 25 29 26 31 28"
            stroke="#C25E34"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 25.5V36"
            stroke="#C25E34"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Open Book Wings at bottom */}
          <path
            d="M13 36C17 34 21 34.5 24 36C27 34.5 31 34 35 36"
            stroke="#EFE9DB"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <span
            className={`font-serif font-bold tracking-tight text-espresso-deep leading-none ${textSizes[size]}`}
          >
            Abook<span className="text-terracotta">.</span>
          </span>
          <span
            className={`font-sans tracking-widest uppercase font-semibold text-secondary ${subTextSizes[size]} mt-1`}
          >
            Toko Buku & Literasi
          </span>
        </div>
      )}
    </div>
  );
}

