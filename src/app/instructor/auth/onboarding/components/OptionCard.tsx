'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  label: string;
}

interface OptionCardProps {
  option: Option;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  option,
  isSelected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-4 rounded-lg border-2 transition-all duration-200',
        'hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-neutral-200 bg-white hover:bg-neutral-50'
      )}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
    >
      <p className="text-base sm:text-lg text-neutral-900 font-medium">
        {option.label}
      </p>
    </button>
  );
}
