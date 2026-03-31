import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
}

export function Logo({ variant = 'dark', size = 'md', href = '/', className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text1: 'text-sm', text2: 'text-[10px]', gap: 'gap-2' },
    md: { icon: 36, text1: 'text-base', text2: 'text-[11px]', gap: 'gap-2.5' },
    lg: { icon: 44, text1: 'text-xl',  text2: 'text-xs',     gap: 'gap-3' },
  };

  const s = sizes[size];

  const textColor1 = variant === 'dark' ? 'text-slate-900' : 'text-white';
  const textColor2 = variant === 'dark' ? 'text-orange-500' : 'text-orange-400';

  const content = (
    <span className={`flex items-center ${s.gap} group ${className}`}>
      {/* Icon mark */}
      <span
        className="relative flex-shrink-0 flex items-center justify-center rounded-xl bg-orange-500 group-hover:bg-orange-600 transition-colors duration-200"
        style={{ width: s.icon, height: s.icon }}
      >
        {/* Car SVG icon */}
        <svg
          width={s.icon * 0.6}
          height={s.icon * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M5 11L6.5 6.5C6.8 5.6 7.65 5 8.6 5H15.4C16.35 5 17.2 5.6 17.5 6.5L19 11M5 11H19M5 11C3.9 11 3 11.9 3 13V16C3 16.55 3.45 17 4 17H5.5M19 11C20.1 11 21 11.9 21 13V16C21 16.55 20.55 17 20 17H18.5M5.5 17C5.5 17.83 6.17 18.5 7 18.5C7.83 18.5 8.5 17.83 8.5 17M5.5 17H8.5M15.5 17C15.5 17.83 16.17 18.5 17 18.5C17.83 18.5 18.5 17.83 18.5 17M15.5 17H18.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Subtle shine */}
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      </span>

      {/* Text */}
      <span className="flex flex-col leading-none">
        <span className={`font-black tracking-tight ${s.text1} ${textColor1}`}>
          TORGERSON'S
        </span>
        <span className={`font-bold tracking-widest ${s.text2} ${textColor2} mt-px`}>
          U-PULL-IT
        </span>
      </span>
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
