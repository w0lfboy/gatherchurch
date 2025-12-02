import { Team } from '@/types/volunteers';
import { Users, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamCardProps {
  team: Team;
  onClick?: () => void;
}

const colorMap: Record<string, string> = {
  sage: 'bg-sage-light text-sage-dark border-sage/30',
  coral: 'bg-coral-light text-coral-dark border-coral/30',
  gold: 'bg-gold-light text-gold-dark border-gold/30',
};

export const TeamCard = ({ team, onClick }: TeamCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all duration-200 text-left group"
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          colorMap[team.color] || 'bg-secondary text-secondary-foreground'
        )}>
          <Users className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {team.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {team.memberCount} members • Led by {team.leaderName}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </button>
  );
};
