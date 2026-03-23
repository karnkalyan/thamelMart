import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: any;
  to?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', size = 'md', as: Component = 'button', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary/90',
    secondary: 'bg-brand-secondary text-brand-primary hover:bg-brand-secondary/80',
    outline: 'border border-brand-primary text-brand-primary hover:bg-brand-secondary',
    ghost: 'hover:bg-brand-secondary text-brand-primary',
  };

  const sizeClasses = {
    sm: 'h-9 px-3',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg',
  };

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  return (
    <Component
      className={classes}
      {...props}
    />
  );
};

export default Button;
