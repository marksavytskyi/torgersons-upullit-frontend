import React from 'react';
import { Clock } from 'lucide-react';
import { formatUpdatedAt } from '@/lib/utils';

interface UpdatedAtProps {
  isoString: string;
  showIcon?: boolean;
  className?: string;
}

export function UpdatedAt({
  isoString,
  showIcon = true,
  className = '',
}: UpdatedAtProps) {
  const label = formatUpdatedAt(isoString);

  return (
    <span
      className={`inline-flex items-center gap-1 text-slate-400 text-xs ${className}`}
    >
      {showIcon && <Clock className="w-3 h-3" />}
      {label}
    </span>
  );
}
