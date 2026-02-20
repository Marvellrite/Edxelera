import React, { useState } from 'react';
import { Check } from 'lucide-react';

// Type definitions
export interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'danger';
}

// Reusable CustomCheckbox Component
export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'primary'
}: CustomCheckboxProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const variantClasses = {
    primary: 'border-blue-500 bg-blue-500',
    success: 'border-green-500 bg-green-500',
    danger: 'border-red-500 bg-red-500'
  };

  return (
    <label className={`flex items-center cursor-pointer gap-.5 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            ${sizeClasses[size]}
            border-2 rounded transition-all duration-200
            ${checked 
              ? variantClasses[variant] 
              : 'border-slate-300 bg-white hover:border-slate-400'
            }
            ${!disabled && 'hover:shadow-sm'}
            flex items-center justify-center
          `}
        >
          {checked && (
            <Check 
              className={`${iconSizes[size]} text-white transition-transform duration-200 scale-100`}
              strokeWidth={3}
            />
          )}
        </div>
      </div>
      {label && (
        <span className="ml-2 text-slate-700 select-none">
          {label}
        </span>
      )}
    </label>
  );
}
