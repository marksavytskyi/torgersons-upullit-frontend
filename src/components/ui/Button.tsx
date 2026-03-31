import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md',
  secondary:
    'bg-white hover:bg-slate-50 text-slate-800 font-semibold border border-slate-300 shadow-sm hover:shadow-md',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-semibold',
  danger:
    'bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm hover:shadow-md',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-lg',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  } ${fullWidth ? 'w-full' : ''} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
