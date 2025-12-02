import { useState } from 'react';
import { Event } from '@/types/events';
import { mockEvents, mockApprovalRequests, mockFacilities } from '@/data/mockEventsData';
import { EventCard } from './EventCard';
import { RoomScheduler } from './RoomScheduler';
import { EquipmentManager } from './EquipmentManager';
import { ApprovalQueue } from './ApprovalQueue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Clock,
  Users,
  Package,
  CheckSquare,
  TrendingUp
} from 'lucide-react';
import { format, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function EventsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'meeting' as const,
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    roomId: ''
  });

  const pendingApprovals = mockApprovalRequests.filter(r => r.status === 'pending').length;
  
  const upcomingEvents = mockEvents
    .filter(e => e.status !== 'cancelled' && e.status !== 'rejected')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const todayEvents = upcomingEvents.filter(e => isToday(parseISO(e.startDate)));
  const thisWeekEvents = upcomingEvents.filter(e => isThisWeek(parseISO(e.startDate)));

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleCreateEvent = () => {
    if (!newEvent.title) {
      toast.error('Please enter an event title');
      return;
    }
    toast.success('Event created successfully');
    setCreateOpen(false);
    setNewEvent({
      title: '',
      description: '',
      type: 'meeting',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      roomId: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events & Facilities</h1>
          <p className="text-muted-foreground">Manage events, room reservations, and equipment</p>
        </div>
        
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Event Title *</Label>
                <Input
                  placeholder="Enter event name"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Event details..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(v: any) => setNewEvent(prev => ({ ...prev, type: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worship_service">Worship Service</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="special_event">Special Event</SelectItem>
                      <SelectItem value="rehearsal">Rehearsal</SelectItem>
                      <SelectItem value="outreach">Outreach</SelectItem>
                      <SelectItem value="fellowship">Fellowship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Room</Label>
                  <Select
                    value={newEvent.roomId}
                    onValueChange={(v) => setNewEvent(prev => ({ ...prev, roomId: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockFacilities.map(room => (
                        <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {format(newEvent.date, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newEvent.date}
                      onSelect={(date) => date && setNewEvent(prev => ({ ...prev, date }))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Select
                    value={newEvent.startTime}
                    onValueChange={(v) => setNewEvent(prev => ({ ...prev, startTime: v }))}
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
                    value={newEvent.endTime}
                    onValueChange={(v) => setNewEvent(prev => ({ ...prev, endTime: v }))}
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
              
              <Button onClick={handleCreateEvent} className="w-full">Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{todayEvents.length}</div>
                <div className="text-sm text-muted-foreground">Today's Events</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{thisWeekEvents.length}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockFacilities.length}</div>
                <div className="text-sm text-muted-foreground">Facilities</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={cn(pendingApprovals > 0 && "ring-2 ring-yellow-500/50")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <CheckSquare className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingApprovals}</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">
            <CalendarIcon className="h-4 w-4 mr-2 hidden sm:inline" />
            Events
          </TabsTrigger>
          <TabsTrigger value="rooms">
            <MapPin className="h-4 w-4 mr-2 hidden sm:inline" />
            Rooms
          </TabsTrigger>
          <TabsTrigger value="equipment">
            <Package className="h-4 w-4 mr-2 hidden sm:inline" />
            Equipment
          </TabsTrigger>
          <TabsTrigger value="approvals" className="relative">
            <CheckSquare className="h-4 w-4 mr-2 hidden sm:inline" />
            Approvals
            {pendingApprovals > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-yellow-500">
                {pendingApprovals}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarIcon className="h-4 w-4 mr-2 hidden sm:inline" />
            Calendar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="worship_service">Worship</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="class">Class</SelectItem>
                <SelectItem value="special_event">Special Event</SelectItem>
                <SelectItem value="rehearsal">Rehearsal</SelectItem>
                <SelectItem value="outreach">Outreach</SelectItem>
                <SelectItem value="fellowship">Fellowship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No events found matching your criteria.</p>
              </div>
            ) : (
              filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="mt-6">
          <RoomScheduler />
        </TabsContent>

        <TabsContent value="equipment" className="mt-6">
          <EquipmentManager />
        </TabsContent>

        <TabsContent value="approvals" className="mt-6">
          <ApprovalQueue />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-7">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-medium text-sm text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 6 + 1;
                  const dayEvents = upcomingEvents.filter(e => {
                    const eventDay = parseISO(e.startDate).getDate();
                    return eventDay === dayNum && dayNum > 0 && dayNum <= 31;
                  });
                  
                  return (
                    <div 
                      key={i} 
                      className={cn(
                        "min-h-24 p-2 border rounded-lg",
                        dayNum > 0 && dayNum <= 31 ? "bg-card" : "bg-muted/30"
                      )}
                    >
                      {dayNum > 0 && dayNum <= 31 && (
                        <>
                          <div className="text-sm font-medium mb-1">{dayNum}</div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <div 
                                key={event.id}
                                className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
