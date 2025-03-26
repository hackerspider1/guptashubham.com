import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6",
        "hover:backdrop-blur-3xl transition-all duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </div>
  );
}