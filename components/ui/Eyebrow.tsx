import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  withLine?: boolean;
}

export default function Eyebrow({ children, className, light = false, withLine = false }: EyebrowProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {withLine && (
        <span
          className={cn(
            'block h-px w-8 shrink-0',
            light ? 'bg-gold-light' : 'bg-gold'
          )}
        />
      )}
      <span
        className={cn(
          'eyebrow',
          light ? 'text-gold-light' : 'text-gold'
        )}
      >
        {children}
      </span>
    </div>
  );
}
