import { Group } from '@/types/groups';
import { 
  Users, MapPin, Clock, Calendar, Baby, 
  Video, Globe, Lock, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroupCardProps {
  group: Group;
  onClick?: () => void;
}

export const GroupCard = ({ group, onClick }: GroupCardProps) => {
  const getTypeLabel = (type: Group['type']) => {
    const labels: Record<string, string> = {
      small_group: 'Small Group',
      class: 'Class',
      ministry_team: 'Ministry Team',
      volunteer_team: 'Volunteer Team',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: Group['type']) => {
    switch (type) {
      case 'small_group': return 'text-sage-dark bg-sage-light';
      case 'class': return 'text-primary bg-primary/10';
      case 'ministry_team': return 'text-coral bg-coral-light';
      case 'volunteer_team': return 'text-gold bg-secondary';
    }
  };

  const getStatusColor = (status: Group['status']) => {
    switch (status) {
      case 'active': return 'text-sage-dark';
      case 'paused': return 'text-gold';
      case 'forming': return 'text-primary';
      case 'archived': return 'text-muted-foreground';
    }
  };

  const spotsAvailable = group.maxMembers ? group.maxMembers - group.currentMembers : null;

  return (
    <div 
      onClick={onClick}
      className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              getTypeColor(group.type)
            )}>
              {getTypeLabel(group.type)}
            </span>
            {!group.openEnrollment && (
              <Lock className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {group.name}
          </h3>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Description */}
      {group.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {group.description}
        </p>
      )}

      {/* Details */}
      <div className="space-y-2 mb-4">
        {group.meetingDay && group.meetingTime && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{group.meetingDay}s at {group.meetingTime}</span>
          </div>
        )}
        
        {group.location && !group.isOnline && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>
              {group.location.isChurchCampus 
                ? group.location.roomName || 'Church Campus'
                : group.location.name || group.location.city
              }
            </span>
          </div>
        )}

        {group.isOnline && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <Video className="w-4 h-4" />
            <span>Online / Hybrid</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{group.currentMembers}{group.maxMembers && ` / ${group.maxMembers}`}</span>
          </div>
          
          {group.hasChildcare && (
            <div className="flex items-center gap-1 text-sm text-sage-dark">
              <Baby className="w-4 h-4" />
              <span>Childcare</span>
            </div>
          )}
        </div>

        {spotsAvailable !== null && spotsAvailable > 0 && group.openEnrollment && (
          <span className="text-xs font-medium text-primary">
            {spotsAvailable} spot{spotsAvailable !== 1 ? 's' : ''} left
          </span>
        )}
        
        {spotsAvailable === 0 && (
          <span className="text-xs font-medium text-coral">Full</span>
        )}
      </div>
    </div>
  );
};
