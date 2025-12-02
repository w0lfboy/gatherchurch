import { Event } from '@/types/events';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video,
  ChevronRight 
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface EventCardProps {
  event: Event;
  onSelect?: (event: Event) => void;
  compact?: boolean;
}

const statusStyles: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  pending_approval: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400',
  rejected: 'bg-destructive/10 text-destructive',
  cancelled: 'bg-muted text-muted-foreground line-through',
  completed: 'bg-muted text-muted-foreground'
};

const typeLabels: Record<string, string> = {
  worship_service: 'Worship',
  meeting: 'Meeting',
  class: 'Class',
  special_event: 'Special Event',
  rehearsal: 'Rehearsal',
  outreach: 'Outreach',
  fellowship: 'Fellowship'
};

export function EventCard({ event, onSelect, compact = false }: EventCardProps) {
  const eventDate = parseISO(event.startDate);
  
  if (compact) {
    return (
      <div 
        className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
        onClick={() => onSelect?.(event)}
      >
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
          <span className="text-xs font-medium uppercase">{format(eventDate, 'MMM')}</span>
          <span className="text-lg font-bold">{format(eventDate, 'd')}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate">{event.title}</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{event.startTime} - {event.endTime}</span>
            {event.roomName && (
              <>
                <span>•</span>
                <span className="truncate">{event.roomName}</span>
              </>
            )}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {typeLabels[event.type]}
              </Badge>
              <Badge className={statusStyles[event.status]}>
                {event.status.replace('_', ' ')}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
            
            {event.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {event.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{format(eventDate, 'EEEE, MMM d, yyyy')}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.startTime} - {event.endTime}</span>
              </div>
              
              {event.roomName && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.roomName}</span>
                </div>
              )}
              
              {event.virtualLink && (
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>Virtual</span>
                </div>
              )}
              
              {event.rsvpEnabled && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{event.rsvpCount.attending} attending</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center px-3 py-2 rounded-lg bg-primary/5 text-primary">
            <span className="text-xs font-medium uppercase">{format(eventDate, 'MMM')}</span>
            <span className="text-2xl font-bold">{format(eventDate, 'd')}</span>
          </div>
        </div>
        
        {onSelect && (
          <div className="mt-4 pt-4 border-t flex justify-end">
            <Button variant="outline" size="sm" onClick={() => onSelect(event)}>
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
