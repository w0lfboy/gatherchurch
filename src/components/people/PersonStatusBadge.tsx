import { PersonStatus } from "@/types/people";
import { cn } from "@/lib/utils";

interface PersonStatusBadgeProps {
  status: PersonStatus;
  size?: 'sm' | 'default';
}

const statusConfig: Record<PersonStatus, { label: string; className: string }> = {
  visitor: {
    label: 'Visitor',
    className: 'bg-gold/15 text-gold border-gold/30',
  },
  regular: {
    label: 'Regular',
    className: 'bg-coral-light text-coral border-coral/30',
  },
  member: {
    label: 'Member',
    className: 'bg-sage-light text-sage-dark border-sage/30',
  },
  volunteer: {
    label: 'Volunteer',
    className: 'bg-primary/10 text-primary border-primary/30',
  },
  leader: {
    label: 'Leader',
    className: 'bg-primary text-primary-foreground border-primary',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-muted text-muted-foreground border-border',
  },
};

export const PersonStatusBadge = ({ status, size = 'default' }: PersonStatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        size === 'sm' ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        config.className
      )}
    >
      {config.label}
    </span>
  );
};
