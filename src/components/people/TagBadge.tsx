import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TagBadgeProps {
  name: string;
  color?: string;
  onRemove?: () => void;
  size?: 'sm' | 'default';
  clickable?: boolean;
  onClick?: () => void;
}

const colorMap: Record<string, string> = {
  sage: 'bg-sage-light text-sage-dark border-sage/20',
  coral: 'bg-coral-light text-coral border-coral/20',
  gold: 'bg-secondary text-gold border-gold/20',
  gray: 'bg-muted text-muted-foreground border-border',
  primary: 'bg-primary/10 text-primary border-primary/20',
};

export const TagBadge = ({ 
  name, 
  color = 'sage', 
  onRemove, 
  size = 'default',
  clickable = false,
  onClick,
}: TagBadgeProps) => {
  const colorClass = colorMap[color] || colorMap.sage;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium transition-colors",
        size === 'sm' ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        colorClass,
        clickable && "cursor-pointer hover:opacity-80",
        onRemove && "pr-1"
      )}
      onClick={clickable ? onClick : undefined}
    >
      {name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
