import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { BlackoutDate } from '@/types/volunteers';
import { mockBlackoutDates } from '@/data/mockVolunteersData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { format, isWithinInterval, parseISO, isSameDay } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AvailabilityCalendarProps {
  volunteerId: string;
  editable?: boolean;
}

export const AvailabilityCalendar = ({ volunteerId, editable = false }: AvailabilityCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newBlackout, setNewBlackout] = useState({ startDate: '', endDate: '', reason: '' });

  const blackouts = mockBlackoutDates.filter(b => b.volunteerId === volunteerId);

  // Check if a date is blacked out
  const isBlackedOut = (date: Date) => {
    return blackouts.some(b => {
      const start = parseISO(b.startDate);
      const end = parseISO(b.endDate);
      return isWithinInterval(date, { start, end }) || isSameDay(date, start) || isSameDay(date, end);
    });
  };

  // Get blackout dates for calendar
  const blackoutDates = blackouts.flatMap(b => {
    const dates: Date[] = [];
    let current = parseISO(b.startDate);
    const end = parseISO(b.endDate);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  const handleAddBlackout = () => {
    // In real app, this would save to backend
    console.log('Adding blackout:', newBlackout);
    setShowAddDialog(false);
    setNewBlackout({ startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Availability</h3>
        {editable && (
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Blackout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Blackout Dates</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={newBlackout.startDate}
                      onChange={(e) => setNewBlackout({ ...newBlackout, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={newBlackout.endDate}
                      onChange={(e) => setNewBlackout({ ...newBlackout, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Reason (optional)</Label>
                  <Input
                    placeholder="e.g., Family vacation"
                    value={newBlackout.reason}
                    onChange={(e) => setNewBlackout({ ...newBlackout, reason: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddBlackout} className="w-full">
                  Add Blackout Dates
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          modifiers={{
            blackout: blackoutDates,
          }}
          modifiersClassNames={{
            blackout: 'bg-coral-light text-coral-dark line-through',
          }}
        />
      </div>

      {/* Blackout list */}
      {blackouts.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Upcoming Blackout Dates</h4>
          {blackouts.map((blackout) => (
            <div
              key={blackout.id}
              className="flex items-center justify-between p-3 bg-coral-light/30 border border-coral/20 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-4 h-4 text-coral-dark" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {format(parseISO(blackout.startDate), 'MMM d')} - {format(parseISO(blackout.endDate), 'MMM d, yyyy')}
                  </p>
                  {blackout.reason && (
                    <p className="text-xs text-muted-foreground">{blackout.reason}</p>
                  )}
                </div>
              </div>
              {editable && (
                <Button size="sm" variant="ghost" className="text-coral-dark hover:text-coral hover:bg-coral-light">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
