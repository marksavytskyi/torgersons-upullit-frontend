import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
}

export function Card({
  children,
  className = '',
  padding = true,
  hover = false,
}: CardProps) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-sm ${
        hover
          ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'
          : ''
      } ${padding ? 'p-6' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
