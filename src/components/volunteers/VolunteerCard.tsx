import { VolunteerProfile } from '@/types/volunteers';
import { mockTeams, mockRoles } from '@/data/mockVolunteersData';
import { PersonAvatar } from '@/components/people/PersonAvatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface VolunteerCardProps {
  volunteer: VolunteerProfile;
  onClick?: () => void;
  compact?: boolean;
}

const statusStyles: Record<string, string> = {
  active: 'bg-sage-light text-sage-dark',
  inactive: 'bg-secondary text-muted-foreground',
  onboarding: 'bg-gold-light text-gold-dark',
  'on-leave': 'bg-coral-light text-coral-dark',
};

export const VolunteerCard = ({ volunteer, onClick, compact = false }: VolunteerCardProps) => {
  const teams = volunteer.teams.map(id => mockTeams.find(t => t.id === id)?.name).filter(Boolean);
  const roles = volunteer.roles.map(id => mockRoles.find(r => r.id === id)?.name).filter(Boolean);

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors w-full text-left"
      >
        <PersonAvatar name={volunteer.personName} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate">{volunteer.personName}</p>
          <p className="text-xs text-muted-foreground truncate">{roles.slice(0, 2).join(', ')}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all duration-200 text-left"
    >
      <div className="flex items-start gap-4">
        <PersonAvatar name={volunteer.personName} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{volunteer.personName}</h3>
            <Badge className={cn('text-xs', statusStyles[volunteer.status])}>
              {volunteer.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{teams.join(', ')}</p>
          <div className="flex flex-wrap gap-1">
            {roles.slice(0, 3).map((role, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {role}
              </Badge>
            ))}
            {roles.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{roles.length - 3}
              </Badge>
            )}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span>{volunteer.servicesThisMonth}/{volunteer.maxServicesPerMonth} this month</span>
            {volunteer.lastServed && (
              <span>Last served: {new Date(volunteer.lastServed).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
