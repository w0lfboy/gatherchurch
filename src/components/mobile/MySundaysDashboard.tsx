import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { mockMySundays } from '@/data/mockMobileData';
import { format, parseISO, isToday, isTomorrow, isPast, isFuture } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function MySundaysDashboard() {
  const [tab, setTab] = useState('upcoming');
  
  const upcomingShifts = mockMySundays.filter(s => isFuture(parseISO(s.date)) || isToday(parseISO(s.date)));
  const pastShifts = mockMySundays.filter(s => isPast(parseISO(s.date)) && !isToday(parseISO(s.date)));

  const handleConfirm = (shiftId: string) => {
    toast.success('You\'re confirmed for this shift!');
  };

  const handleDecline = (shiftId: string) => {
    toast.success('Shift declined. Your team leader has been notified.');
  };

  const handleRequestSwap = (shiftId: string) => {
    toast.success('Swap request sent to your team.');
  };

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="px-4">
        <h1 className="text-2xl font-display font-semibold text-foreground">
          My Sundays
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your upcoming volunteer schedule
        </p>
      </div>

      {/* Stats */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-primary">{upcomingShifts.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Upcoming</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-foreground">
                {new Set(mockMySundays.map(s => s.teamName)).size}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Teams</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-foreground">{pastShifts.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Served</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {upcomingShifts.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming shifts</p>
              </div>
            ) : (
              upcomingShifts.map((shift, index) => (
                <ShiftCard 
                  key={shift.id} 
                  shift={shift} 
                  isNext={index === 0}
                  onConfirm={handleConfirm}
                  onDecline={handleDecline}
                  onRequestSwap={handleRequestSwap}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-4 space-y-4">
            {pastShifts.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No past shifts</p>
              </div>
            ) : (
              pastShifts.map(shift => (
                <Card key={shift.id} className="opacity-70">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-secondary flex-shrink-0">
                        <span className="text-[10px] font-medium text-muted-foreground uppercase">
                          {format(parseISO(shift.date), 'MMM')}
                        </span>
                        <span className="text-lg font-bold text-foreground leading-none">
                          {format(parseISO(shift.date), 'd')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{shift.teamName}</h3>
                        <p className="text-sm text-muted-foreground">{shift.position}</p>
                        <p className="text-xs text-muted-foreground mt-1">{shift.serviceTime}</p>
                      </div>
                      <Badge variant="secondary">Served</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface ShiftCardProps {
  shift: typeof mockMySundays[0];
  isNext: boolean;
  onConfirm: (id: string) => void;
  onDecline: (id: string) => void;
  onRequestSwap: (id: string) => void;
}

function ShiftCard({ shift, isNext, onConfirm, onDecline, onRequestSwap }: ShiftCardProps) {
  const dateLabel = isToday(parseISO(shift.date)) 
    ? 'Today' 
    : isTomorrow(parseISO(shift.date)) 
    ? 'Tomorrow' 
    : format(parseISO(shift.date), 'EEEE, MMM d');

  return (
    <Card className={cn(
      isNext && 'border-primary/30 bg-gradient-to-br from-primary/5 to-transparent'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            {isNext && (
              <Badge className="mb-2 bg-primary text-primary-foreground">
                Next Up
              </Badge>
            )}
            <h3 className="font-semibold text-foreground text-lg">{shift.teamName}</h3>
            <p className="text-sm text-muted-foreground">{shift.position}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{dateLabel}</div>
            <div className="text-xs text-muted-foreground">{shift.serviceTime}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Check-in {shift.checkInTime}</span>
          </div>
        </div>

        {shift.notes && (
          <div className="p-3 bg-secondary/50 rounded-lg mb-4">
            <p className="text-sm text-muted-foreground">{shift.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onConfirm(shift.id)}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Confirm
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onRequestSwap(shift.id)}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={() => onDecline(shift.id)}
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
