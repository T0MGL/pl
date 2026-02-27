import { cn } from '@/lib/utils';

type BadgeVariant = 'gold' | 'dark' | 'outline' | 'success' | 'warning';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: 'badge-gold',
  dark: 'badge-dark',
  outline: 'badge-outline',
  success: 'badge border border-emerald-600 text-emerald-700',
  warning: 'badge border border-amber-500 text-amber-700',
};

export default function Badge({ variant = 'outline', className, children }: BadgeProps) {
  return (
    <span className={cn(variantStyles[variant], className)}>
      {children}
    </span>
  );
}
