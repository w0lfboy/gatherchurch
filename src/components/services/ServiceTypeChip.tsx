import { cn } from "@/lib/utils";

interface ServiceTypeChipProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const ServiceTypeChip = ({ 
  name, 
  color = 'hsl(145 25% 38%)', 
  size = 'sm',
  className 
}: ServiceTypeChipProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full transition-all duration-200",
        size === 'sm' ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
      style={{
        backgroundColor: color.replace(')', ' / 0.15)').replace('hsl', 'hsl'),
        color: color,
      }}
    >
      {name}
    </span>
  );
};
