import { SwapRequest } from '@/types/volunteers';
import { mockScheduledShifts, getTeamById, getRoleById } from '@/data/mockVolunteersData';
import { PersonAvatar } from '@/components/people/PersonAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, ArrowRight, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwapRequestCardProps {
  request: SwapRequest;
  onAccept?: (volunteerId: string) => void;
  onApprove?: () => void;
  onDeny?: () => void;
  isAdmin?: boolean;
}

const statusStyles: Record<string, string> = {
  open: 'bg-gold-light text-gold-dark',
  'pending-approval': 'bg-secondary text-muted-foreground',
  approved: 'bg-sage-light text-sage-dark',
  denied: 'bg-coral-light text-coral-dark',
  completed: 'bg-sage-light text-sage-dark',
};

export const SwapRequestCard = ({ request, onAccept, onApprove, onDeny, isAdmin = false }: SwapRequestCardProps) => {
  const shift = mockScheduledShifts.find(s => s.id === request.shiftId);
  const team = shift ? getTeamById(shift.teamId) : null;
  const role = shift ? getRoleById(shift.roleId) : null;

  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium text-foreground capitalize">{request.requestType} Request</span>
        </div>
        <Badge className={statusStyles[request.status]}>
          {request.status.replace('-', ' ')}
        </Badge>
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 mb-3">
        <div className="flex items-center gap-3 mb-2">
          <PersonAvatar name={request.requesterName} size="sm" />
          <div>
            <p className="font-medium text-sm">{request.requesterName}</p>
            <p className="text-xs text-muted-foreground">{role?.name} • {team?.name}</p>
          </div>
        </div>
        {shift && (
          <p className="text-sm text-muted-foreground">
            {new Date(shift.serviceDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {shift.serviceTime}
          </p>
        )}
        <p className="text-sm text-foreground mt-2">"{request.reason}"</p>
      </div>

      {request.status === 'open' && request.suggestedReplacements.length > 0 && (
        <div className="space-y-2 mb-3">
          <p className="text-sm font-medium text-foreground">Suggested Replacements</p>
          {request.suggestedReplacements.map((suggestion) => (
            <div key={suggestion.volunteerId} className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2">
                <PersonAvatar name={suggestion.volunteerName} size="sm" />
                <div>
                  <p className="text-sm font-medium">{suggestion.volunteerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {suggestion.matchScore}% match • {suggestion.servicesThisMonth} services this month
                  </p>
                </div>
              </div>
              {suggestion.isAvailable ? (
                <Button size="sm" onClick={() => onAccept?.(suggestion.volunteerId)}>
                  <Check className="w-4 h-4 mr-1" />
                  Accept
                </Button>
              ) : (
                <Badge variant="outline" className="text-xs">Unavailable</Badge>
              )}
            </div>
          ))}
        </div>
      )}

      {isAdmin && request.status === 'pending-approval' && (
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Button size="sm" onClick={onApprove} className="flex-1">
            Approve Swap
          </Button>
          <Button size="sm" variant="outline" onClick={onDeny}>
            Deny
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-3">
        <Clock className="w-3 h-3 inline mr-1" />
        Requested {new Date(request.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};
