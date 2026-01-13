import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, XCircle, Circle, PlayCircle, FileEdit } from "lucide-react";

type StatusType = 'confirmed' | 'pending' | 'declined' | 'draft' | 'scheduled' | 'live' | 'completed';

interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; icon: typeof CheckCircle2; className: string }> = {
  confirmed: {
    label: 'Confirmed',
    icon: CheckCircle2,
    className: 'bg-sage-light text-sage-dark',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-gold/15 text-gold',
  },
  declined: {
    label: 'Declined',
    icon: XCircle,
    className: 'bg-destructive/10 text-destructive',
  },
  draft: {
    label: 'Draft',
    icon: FileEdit,
    className: 'bg-muted text-muted-foreground',
  },
  scheduled: {
    label: 'Scheduled',
    icon: Circle,
    className: 'bg-primary/10 text-primary',
  },
  live: {
    label: 'Live',
    icon: PlayCircle,
    className: 'bg-coral/15 text-coral animate-pulse-soft',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'bg-muted text-muted-foreground',
  },
};

export const StatusBadge = ({ 
  status, 
  showIcon = true, 
  size = 'sm',
  className 
}: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200",
        size === 'sm' ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        config.className,
        className
      )}
    >
      {showIcon && <Icon className={cn(size === 'sm' ? "h-3 w-3" : "h-4 w-4")} />}
      {config.label}
    </span>
  );
};
