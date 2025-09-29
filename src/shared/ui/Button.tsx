import React from 'react';
import { cn } from '@/shared/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center 
    rounded-lg font-semibold 
    transition-all duration-200 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    active:scale-95 transform
    shadow-sm hover:shadow-md
    animate-fade-in
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 
      text-white 
      hover:from-blue-700 hover:to-blue-800
      focus-visible:ring-blue-500
      shadow-blue-500/25
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 
      text-gray-900 
      hover:from-gray-200 hover:to-gray-300
      focus-visible:ring-gray-500
      border border-gray-300
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-700 
      text-white 
      hover:from-red-700 hover:to-red-800
      focus-visible:ring-red-500
      shadow-red-500/25
    `,
    outline: `
      border-2 border-blue-600 
      bg-transparent 
      text-blue-600 
      hover:bg-blue-600 hover:text-white
      focus-visible:ring-blue-500
      transition-colors duration-200
    `,
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm gap-1',
    md: 'h-10 px-4 py-2 text-sm gap-2',
    lg: 'h-12 px-6 py-3 text-base gap-2',
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
