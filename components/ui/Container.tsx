import { cn } from '@/lib/utils';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  narrow?: boolean;
  wide?: boolean;
}

export default function Container({
  className,
  children,
  as: Component = 'div',
  narrow = false,
  wide = false,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'container-site',
        narrow && '!max-w-3xl',
        wide && '!max-w-[1600px]',
        className
      )}
    >
      {children}
    </Component>
  );
}
