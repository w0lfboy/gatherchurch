import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { ScheduledShift } from '@/types/volunteers';
import { mockScheduledShifts, getTeamById, getRoleById } from '@/data/mockVolunteersData';
import { Badge } from '@/components/ui/badge';
import { PersonAvatar } from '@/components/people/PersonAvatar';
import { format, isSameDay, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface ScheduleCalendarProps {
  volunteerId?: string;
  teamId?: string;
  onDateSelect?: (date: Date) => void;
  onShiftSelect?: (shift: ScheduledShift) => void;
}

export const ScheduleCalendar = ({ volunteerId, teamId, onDateSelect, onShiftSelect }: ScheduleCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Filter shifts based on props
  let shifts = [...mockScheduledShifts];
  if (volunteerId) {
    shifts = shifts.filter(s => s.volunteerId === volunteerId);
  }
  if (teamId) {
    shifts = shifts.filter(s => s.teamId === teamId);
  }

  // Get shifts for selected date
  const selectedDateShifts = shifts.filter(s => 
    isSameDay(parseISO(s.serviceDate), selectedDate)
  );

  // Get dates with shifts for calendar highlighting
  const datesWithShifts = shifts.map(s => parseISO(s.serviceDate));

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect?.(date);
    }
  };

  const statusColors: Record<string, string> = {
    pending: 'border-l-gold',
    confirmed: 'border-l-sage',
    declined: 'border-l-coral',
    'swap-requested': 'border-l-muted-foreground',
    covered: 'border-l-sage',
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Calendar */}
      <div className="bg-card border border-border rounded-xl p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="pointer-events-auto"
          modifiers={{
            hasShift: datesWithShifts,
          }}
          modifiersClassNames={{
            hasShift: 'bg-primary/10 font-semibold',
          }}
        />
      </div>

      {/* Selected date shifts */}
      <div className="flex-1 bg-card border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-4">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h3>
        
        {selectedDateShifts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No shifts scheduled for this day</p>
        ) : (
          <div className="space-y-3">
            {selectedDateShifts.map((shift) => {
              const team = getTeamById(shift.teamId);
              const role = getRoleById(shift.roleId);
              
              return (
                <button
                  key={shift.id}
                  onClick={() => onShiftSelect?.(shift)}
                  className={cn(
                    "w-full p-3 bg-secondary/30 rounded-lg border-l-4 text-left hover:bg-secondary/50 transition-colors",
                    statusColors[shift.status]
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{shift.serviceTime}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {shift.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <PersonAvatar name={shift.volunteerName} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{shift.volunteerName}</p>
                      <p className="text-xs text-muted-foreground">{role?.name} • {team?.name}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
