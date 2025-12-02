import { cn } from "@/lib/utils";
import { Person } from "@/types/people";

interface PersonAvatarProps {
  person?: Person;
  name?: string;
  size?: 'sm' | 'default' | 'lg' | 'xl';
  showStatus?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  default: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const statusColors: Record<string, string> = {
  visitor: 'bg-gold',
  regular: 'bg-coral',
  member: 'bg-sage',
  volunteer: 'bg-primary',
  leader: 'bg-primary',
  inactive: 'bg-muted-foreground',
};

export const PersonAvatar = ({ person, name, size = 'default', showStatus = false }: PersonAvatarProps) => {
  // Get display name and initials
  const displayName = person ? `${person.firstName} ${person.lastName}` : name || '';
  const nameParts = displayName.split(' ').filter(Boolean);
  const initials = nameParts.length >= 2 
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
    : displayName.slice(0, 2).toUpperCase();
  
  // Generate a consistent color based on name
  const colors = [
    'from-sage-light to-sage/30',
    'from-coral-light to-coral/30',
    'from-secondary to-gold/20',
    'from-sage-light to-coral-light',
    'from-coral-light to-secondary',
  ];
  const charSum = displayName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const colorIndex = charSum % colors.length;
  
  return (
    <div className="relative inline-block">
      {person?.avatar ? (
        <img
          src={person.avatar}
          alt={displayName}
          className={cn(
            "rounded-full object-cover",
            sizeClasses[size]
          )}
        />
      ) : (
        <div
          className={cn(
            "rounded-full flex items-center justify-center font-display font-semibold text-foreground bg-gradient-to-br",
            sizeClasses[size],
            colors[colorIndex]
          )}
        >
          {initials}
        </div>
      )}
      {showStatus && person && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' || size === 'xl' ? 'w-4 h-4' : 'w-3 h-3',
            statusColors[person.status]
          )}
        />
      )}
    </div>
  );
};
