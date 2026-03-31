import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'amber' | 'slate' | 'white' | 'emerald' | 'blue' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses: Record<string, string> = {
  amber: 'bg-amber-500 text-white',
  slate: 'bg-slate-800 text-white',
  white: 'bg-white text-slate-800 border border-slate-200',
  emerald: 'bg-emerald-500 text-white',
  blue: 'bg-blue-500 text-white',
  red: 'bg-red-500 text-white',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs font-semibold rounded',
  md: 'px-3 py-1 text-sm font-bold rounded-md',
};

export function Badge({
  children,
  variant = 'amber',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center tracking-wide ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
