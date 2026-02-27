'use client';

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'gold' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  gold: 'btn-gold',
  ghost: 'btn-ghost',
  link: 'inline-flex items-center gap-2 text-charcoal text-sm font-body hover:text-gold transition-colors duration-300 underline-offset-4',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: '!px-5 !py-3 !text-2xs',
  md: '!px-8 !py-4 !text-xs',
  lg: '!px-10 !py-5 !text-sm',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
