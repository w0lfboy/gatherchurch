import { ScheduledShift } from '@/types/volunteers';
import { getTeamById, getRoleById } from '@/data/mockVolunteersData';
import { PersonAvatar } from '@/components/people/PersonAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, RefreshCw, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShiftCardProps {
  shift: ScheduledShift;
  onConfirm?: () => void;
  onDecline?: () => void;
  onRequestSwap?: () => void;
  showActions?: boolean;
}

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  pending: { label: 'Pending', className: 'bg-gold-light text-gold-dark', icon: <Clock className="w-3 h-3" /> },
  confirmed: { label: 'Confirmed', className: 'bg-sage-light text-sage-dark', icon: <Check className="w-3 h-3" /> },
  declined: { label: 'Declined', className: 'bg-coral-light text-coral-dark', icon: <X className="w-3 h-3" /> },
  'swap-requested': { label: 'Swap Requested', className: 'bg-secondary text-muted-foreground', icon: <RefreshCw className="w-3 h-3" /> },
  covered: { label: 'Covered', className: 'bg-sage-light text-sage-dark', icon: <Check className="w-3 h-3" /> },
};

export const ShiftCard = ({ shift, onConfirm, onDecline, onRequestSwap, showActions = false }: ShiftCardProps) => {
  const team = getTeamById(shift.teamId);
  const role = getRoleById(shift.roleId);
  const status = statusConfig[shift.status];

  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <PersonAvatar name={shift.volunteerName} size="sm" />
          <div>
            <p className="font-medium text-foreground">{shift.volunteerName}</p>
            <p className="text-sm text-muted-foreground">{role?.name}</p>
          </div>
        </div>
        <Badge className={cn('flex items-center gap-1', status.className)}>
          {status.icon}
          {status.label}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <span>{team?.name}</span>
        <span>•</span>
        <span>{shift.serviceTime}</span>
        <span>•</span>
        <span>{new Date(shift.serviceDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
      </div>

      {showActions && shift.status === 'pending' && (
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Button size="sm" onClick={onConfirm} className="flex-1">
            <Check className="w-4 h-4 mr-1" />
            Confirm
          </Button>
          <Button size="sm" variant="outline" onClick={onDecline}>
            <X className="w-4 h-4 mr-1" />
            Decline
          </Button>
          <Button size="sm" variant="ghost" onClick={onRequestSwap}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
