import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Type definitions
export interface SelectOption {
  value: string;
  key: string;
}

export interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (option: SelectOption) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string
}

// Reusable CustomSelect Component
export function CustomSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option...',
  className = '',
  disabled = false,
  label
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={ cn('w-full bg-white border-2 border-slate-200 rounded-lg px-3 flex items-between hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 h-[61px] items-center', 
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer', 
         )
        }
      >

        <div className={cn(' flex h-full w-full flex-col text-left gap-0 justify-center',  label? 'justify-evenly ':"justfy-center")}>
            
        { label && <span>{label}</span>}

        <span className={selectedOption ? 'text-slate-900' : 'text-slate-400'}>
          {selectedOption ? selectedOption.key : placeholder}
        </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute w-full mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-50 transition-colors duration-150 text-left"
            >
              <span className={`${value === option.value ? 'text-blue-600 font-medium' : 'text-slate-700'}`}>
                {option.key}
              </span>
              {value === option.value && (
                <Check className="w-5 h-5 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect