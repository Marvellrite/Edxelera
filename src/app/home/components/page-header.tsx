'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
  className,
  contentClassName,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border',
        'border-[var(--border-subtle)]',
        'bg-[var(--surface-raised)]',
        'shadow-[var(--shadow-soft)]',
        'transition-all duration-300',
        'p-6 sm:p-8 lg:p-10',
        'dark:border-[var(--border-strong)]',
        'dark:bg-[var(--surface)]',
        className
      )}
    >
      {/* Subtle background accent - visible in light mode, subtle in dark */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--primary-50)] via-transparent to-transparent opacity-40 dark:opacity-10" />

      <div className={cn('relative z-10', contentClassName)}>
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-strong)] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {children && <div className="mt-4 sm:mt-6">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
