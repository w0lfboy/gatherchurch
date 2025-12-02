import { useState } from 'react';
import { Facility, FacilityReservation } from '@/types/events';
import { mockFacilities, mockReservations, checkRoomConflict, getAvailableSlots } from '@/data/mockEventsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CalendarIcon, 
  Users, 
  Clock, 
  MapPin, 
  Check, 
  X, 
  AlertTriangle,
  Building,
  Wifi,
  Music,
  Tv,
  Coffee
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const amenityIcons: Record<string, any> = {
  'Sound System': Music,
  'Projector': Tv,
  'TV Display': Tv,
  'Video Conferencing': Wifi,
  'Kitchen Access': Coffee,
  'Cafe Area': Coffee
};

export function RoomScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoom, setSelectedRoom] = useState<Facility | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    eventTitle: '',
    startTime: '09:00',
    endTime: '10:00'
  });

  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  
  const getRoomStatus = (roomId: string) => {
    const bookedSlots = getAvailableSlots(roomId, dateStr);
    if (bookedSlots.length === 0) return 'available';
    return 'partial';
  };

  const handleBookRoom = () => {
    if (!selectedRoom || !bookingForm.eventTitle) {
      toast.error('Please fill in all required fields');
      return;
    }

    const conflict = checkRoomConflict(
      selectedRoom.id,
      dateStr,
      bookingForm.startTime,
      bookingForm.endTime
    );

    if (conflict.hasConflict) {
      toast.error(`Time conflict with "${conflict.conflictingEvent}"`);
      return;
    }

    toast.success(`Room "${selectedRoom.name}" reserved successfully`);
    setBookingOpen(false);
    setBookingForm({ eventTitle: '', startTime: '09:00', endTime: '10:00' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Sidebar */}
        <Card className="lg:w-80 shrink-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md"
            />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-muted-foreground">Partially Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-muted-foreground">Fully Booked</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              Rooms for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {mockFacilities.map(room => {
              const status = getRoomStatus(room.id);
              const bookedSlots = getAvailableSlots(room.id, dateStr);
              
              return (
                <Card 
                  key={room.id} 
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedRoom?.id === room.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedRoom(room)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{room.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {room.building} {room.floor && `• ${room.floor}`}
                        </p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={cn(
                          status === 'available' && 'bg-green-500/10 text-green-600 border-green-200',
                          status === 'partial' && 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
                        )}
                      >
                        {status === 'available' ? 'Available' : 'Partial'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{room.setupTimeMinutes}m setup</span>
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {room.amenities.slice(0, 4).map(amenity => {
                        const Icon = amenityIcons[amenity] || Building;
                        return (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            <Icon className="h-3 w-3 mr-1" />
                            {amenity}
                          </Badge>
                        );
                      })}
                      {room.amenities.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{room.amenities.length - 4}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Booked Slots */}
                    {bookedSlots.length > 0 && (
                      <div className="pt-3 border-t">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Booked:</p>
                        <div className="space-y-1">
                          {bookedSlots.map((slot, i) => (
                            <div key={i} className="text-xs flex justify-between">
                              <span className="text-muted-foreground">{slot.start} - {slot.end}</span>
                              <span className="truncate ml-2">{slot.event}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Room Details & Booking */}
      {selectedRoom && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>{selectedRoom.name}</CardTitle>
              <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogTrigger asChild>
                  <Button>Reserve Room</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reserve {selectedRoom.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Event Title</Label>
                      <Input
                        placeholder="Enter event name"
                        value={bookingForm.eventTitle}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, eventTitle: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <div className="p-2 border rounded-md bg-muted/50">
                        {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Select
                          value={bookingForm.startTime}
                          onValueChange={(v) => setBookingForm(prev => ({ ...prev, startTime: v }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 28 }, (_, i) => {
                              const hour = Math.floor(i / 2) + 6;
                              const min = i % 2 === 0 ? '00' : '30';
                              const time = `${hour.toString().padStart(2, '0')}:${min}`;
                              return <SelectItem key={time} value={time}>{time}</SelectItem>;
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Select
                          value={bookingForm.endTime}
                          onValueChange={(v) => setBookingForm(prev => ({ ...prev, endTime: v }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 28 }, (_, i) => {
                              const hour = Math.floor(i / 2) + 6;
                              const min = i % 2 === 0 ? '00' : '30';
                              const time = `${hour.toString().padStart(2, '0')}:${min}`;
                              return <SelectItem key={time} value={time}>{time}</SelectItem>;
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {selectedRoom.requiresApproval && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">This room requires approval</span>
                      </div>
                    )}
                    
                    <Button onClick={handleBookRoom} className="w-full">
                      {selectedRoom.requiresApproval ? 'Submit Request' : 'Reserve Room'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{selectedRoom.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">Capacity</div>
                <div className="text-lg font-semibold">{selectedRoom.capacity}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">Setup Time</div>
                <div className="text-lg font-semibold">{selectedRoom.setupTimeMinutes} min</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">Cleanup Time</div>
                <div className="text-lg font-semibold">{selectedRoom.cleanupTimeMinutes} min</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">Approval</div>
                <div className="text-lg font-semibold">
                  {selectedRoom.requiresApproval ? 'Required' : 'Auto'}
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.amenities.map(amenity => (
                  <Badge key={amenity} variant="outline">{amenity}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
