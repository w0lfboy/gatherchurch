import { Room } from '@/types/checkins';
import { getCheckedInByRoom } from '@/data/mockCheckInsData';
import { Users, AlertTriangle, Baby, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomStatusProps {
  room: Room;
  compact?: boolean;
  onClick?: () => void;
}

export const RoomStatus = ({ room, compact = false, onClick }: RoomStatusProps) => {
  const checkedIn = getCheckedInByRoom(room.id);
  const alertsCount = checkedIn.filter(c => c.medicalAlerts.length > 0 || c.allergies.length > 0).length;
  
  const capacityPercentage = room.capacity ? Math.round((room.currentCount / room.capacity) * 100) : 0;
  const isFull = room.capacity ? room.currentCount >= room.capacity : false;
  const isNearCapacity = room.capacity ? capacityPercentage >= 80 : false;

  if (compact) {
    return (
      <div 
        onClick={onClick}
        className={cn(
          "p-4 rounded-xl border transition-all cursor-pointer",
          isFull 
            ? "bg-coral-light border-coral/30" 
            : isNearCapacity 
              ? "bg-secondary border-gold/30"
              : "bg-card border-border hover:border-primary/30"
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-foreground truncate">{room.name}</span>
          {alertsCount > 0 && (
            <AlertTriangle className="w-4 h-4 text-gold flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-display font-semibold text-foreground">
            {room.currentCount}
            {room.capacity && (
              <span className="text-sm text-muted-foreground font-normal">/{room.capacity}</span>
            )}
          </span>
          {room.ageRange && (
            <span className="text-xs text-muted-foreground">{room.ageRange}</span>
          )}
        </div>
        {room.capacity && (
          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                isFull ? "bg-coral" : isNearCapacity ? "bg-gold" : "bg-sage"
              )}
              style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-5 rounded-xl border transition-all cursor-pointer",
        isFull 
          ? "bg-coral-light border-coral/30" 
          : isNearCapacity 
            ? "bg-secondary border-gold/30"
            : "bg-card border-border hover:border-primary/30 hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{room.name}</h3>
          <p className="text-sm text-muted-foreground">{room.department}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Capacity */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-3xl font-display font-semibold text-foreground">
          {room.currentCount}
        </span>
        {room.capacity && (
          <span className="text-lg text-muted-foreground">/ {room.capacity}</span>
        )}
      </div>

      {room.capacity && (
        <div className="mb-3">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                isFull ? "bg-coral" : isNearCapacity ? "bg-gold" : "bg-sage"
              )}
              style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {capacityPercentage}% capacity
          </p>
        </div>
      )}

      {/* Details */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {room.ageRange && (
          <span className="flex items-center gap-1">
            <Baby className="w-4 h-4" />
            {room.ageRange}
          </span>
        )}
        {room.ratio && (
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {room.ratio}
          </span>
        )}
      </div>

      {/* Alerts */}
      {alertsCount > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <span className="text-xs font-medium text-gold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {alertsCount} medical alert{alertsCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};
