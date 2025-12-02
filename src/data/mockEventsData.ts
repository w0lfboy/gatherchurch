import { 
  Event, 
  Facility, 
  FacilityReservation, 
  Equipment, 
  EquipmentRequest,
  EventRSVP, 
  ApprovalRequest,
  CalendarEvent
} from '@/types/events';

export const mockFacilities: Facility[] = [
  {
    id: 'fac-1',
    name: 'Main Sanctuary',
    building: 'Main Building',
    floor: '1st Floor',
    capacity: 500,
    description: 'Primary worship space with full audio/visual capabilities',
    amenities: ['Stage', 'Sound System', 'Projector', 'Baptistry', 'Piano', 'Organ'],
    isActive: true,
    requiresApproval: true,
    allowedEventTypes: ['worship_service', 'special_event', 'rehearsal'],
    setupTimeMinutes: 30,
    cleanupTimeMinutes: 30
  },
  {
    id: 'fac-2',
    name: 'Fellowship Hall',
    building: 'Main Building',
    floor: '1st Floor',
    capacity: 200,
    description: 'Large multipurpose room with kitchen access',
    amenities: ['Tables', 'Chairs', 'Kitchen Access', 'Projector', 'Sound System'],
    isActive: true,
    requiresApproval: false,
    allowedEventTypes: ['meeting', 'class', 'special_event', 'fellowship', 'outreach'],
    setupTimeMinutes: 15,
    cleanupTimeMinutes: 30
  },
  {
    id: 'fac-3',
    name: 'Conference Room A',
    building: 'Education Wing',
    floor: '2nd Floor',
    capacity: 20,
    description: 'Professional meeting space with video conferencing',
    amenities: ['Conference Table', 'TV Display', 'Whiteboard', 'Video Conferencing'],
    isActive: true,
    requiresApproval: false,
    allowedEventTypes: ['meeting', 'class'],
    setupTimeMinutes: 5,
    cleanupTimeMinutes: 10
  },
  {
    id: 'fac-4',
    name: 'Youth Room',
    building: 'Education Wing',
    floor: '1st Floor',
    capacity: 75,
    description: 'Flexible space designed for youth activities',
    amenities: ['Gaming Area', 'Sound System', 'Stage', 'Couches', 'Cafe Area'],
    isActive: true,
    requiresApproval: false,
    allowedEventTypes: ['meeting', 'class', 'fellowship', 'rehearsal'],
    setupTimeMinutes: 10,
    cleanupTimeMinutes: 15
  },
  {
    id: 'fac-5',
    name: 'Chapel',
    building: 'Main Building',
    floor: '1st Floor',
    capacity: 50,
    description: 'Intimate worship and prayer space',
    amenities: ['Piano', 'Simple Sound', 'Altar'],
    isActive: true,
    requiresApproval: true,
    allowedEventTypes: ['worship_service', 'meeting', 'special_event'],
    setupTimeMinutes: 10,
    cleanupTimeMinutes: 10
  },
  {
    id: 'fac-6',
    name: 'Outdoor Pavilion',
    building: 'Grounds',
    capacity: 150,
    description: 'Covered outdoor space for events',
    amenities: ['Picnic Tables', 'Electrical Outlets', 'Grill Area'],
    isActive: true,
    requiresApproval: false,
    allowedEventTypes: ['fellowship', 'outreach', 'special_event'],
    setupTimeMinutes: 20,
    cleanupTimeMinutes: 30
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Folding Chairs',
    category: 'Seating',
    description: 'Standard folding chairs',
    quantity: 200,
    availableQuantity: 180,
    location: 'Storage Room A',
    status: 'available'
  },
  {
    id: 'eq-2',
    name: 'Round Tables (60")',
    category: 'Tables',
    description: '60-inch round banquet tables',
    quantity: 30,
    availableQuantity: 25,
    location: 'Storage Room A',
    status: 'available'
  },
  {
    id: 'eq-3',
    name: 'Rectangular Tables (8\')',
    category: 'Tables',
    description: '8-foot rectangular folding tables',
    quantity: 20,
    availableQuantity: 18,
    location: 'Storage Room A',
    status: 'available'
  },
  {
    id: 'eq-4',
    name: 'Portable Sound System',
    category: 'Audio/Visual',
    description: 'Includes speakers, mixer, and wireless mics',
    quantity: 2,
    availableQuantity: 1,
    location: 'Tech Closet',
    status: 'available'
  },
  {
    id: 'eq-5',
    name: 'Projector + Screen',
    category: 'Audio/Visual',
    description: 'Portable projector with tripod screen',
    quantity: 3,
    availableQuantity: 2,
    location: 'Tech Closet',
    status: 'available'
  },
  {
    id: 'eq-6',
    name: 'Portable Stage Risers',
    category: 'Stage',
    description: '4x4 modular stage sections',
    quantity: 12,
    availableQuantity: 12,
    location: 'Storage Room B',
    status: 'available'
  },
  {
    id: 'eq-7',
    name: 'Keyboard Stand',
    category: 'Music',
    quantity: 3,
    availableQuantity: 3,
    location: 'Music Room',
    status: 'available'
  },
  {
    id: 'eq-8',
    name: 'Podium/Lectern',
    category: 'Presentation',
    description: 'Wooden podium with built-in mic',
    quantity: 2,
    availableQuantity: 2,
    location: 'Sanctuary Storage',
    status: 'available'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Sunday Morning Worship',
    description: 'Weekly Sunday morning worship service',
    type: 'worship_service',
    status: 'approved',
    startDate: '2024-01-21',
    endDate: '2024-01-21',
    startTime: '10:00',
    endTime: '12:00',
    isAllDay: false,
    timezone: 'America/Chicago',
    recurrence: 'weekly',
    roomId: 'fac-1',
    roomName: 'Main Sanctuary',
    isOffsite: false,
    expectedAttendance: 350,
    maxCapacity: 500,
    rsvpEnabled: false,
    rsvpCount: { attending: 0, maybe: 0, declined: 0 },
    organizerId: 'user-1',
    organizerName: 'Pastor Michael Chen',
    contactEmail: 'pastor@gracechurch.org',
    linkedServiceId: 'srv-1',
    equipmentRequests: [],
    requiresApproval: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'evt-2',
    title: 'Women\'s Ministry Brunch',
    description: 'Monthly gathering for women of all ages. Featuring guest speaker Dr. Sarah Williams on "Finding Rest in a Busy World"',
    type: 'fellowship',
    status: 'approved',
    startDate: '2024-01-27',
    endDate: '2024-01-27',
    startTime: '09:30',
    endTime: '12:00',
    isAllDay: false,
    timezone: 'America/Chicago',
    recurrence: 'monthly',
    roomId: 'fac-2',
    roomName: 'Fellowship Hall',
    isOffsite: false,
    expectedAttendance: 80,
    maxCapacity: 100,
    rsvpEnabled: true,
    rsvpDeadline: '2024-01-25',
    rsvpCount: { attending: 62, maybe: 12, declined: 5 },
    departmentName: 'Women\'s Ministry',
    organizerId: 'user-2',
    organizerName: 'Jennifer Martinez',
    contactEmail: 'women@gracechurch.org',
    equipmentRequests: [
      { id: 'er-1', equipmentId: 'eq-2', equipmentName: 'Round Tables (60")', quantity: 10, eventId: 'evt-2', status: 'approved', requestedBy: 'user-2', requestedAt: '2024-01-10T00:00:00Z' }
    ],
    requiresApproval: false,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'evt-3',
    title: 'Youth Group Game Night',
    description: 'Fun night of games, snacks, and fellowship for middle and high school students',
    type: 'fellowship',
    status: 'approved',
    startDate: '2024-01-26',
    endDate: '2024-01-26',
    startTime: '18:30',
    endTime: '21:00',
    isAllDay: false,
    timezone: 'America/Chicago',
    recurrence: 'none',
    roomId: 'fac-4',
    roomName: 'Youth Room',
    isOffsite: false,
    expectedAttendance: 45,
    maxCapacity: 75,
    rsvpEnabled: true,
    rsvpCount: { attending: 38, maybe: 8, declined: 2 },
    departmentName: 'Youth Ministry',
    organizerId: 'user-3',
    organizerName: 'David Kim',
    contactEmail: 'youth@gracechurch.org',
    equipmentRequests: [],
    requiresApproval: false,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: 'evt-4',
    title: 'Elder Board Meeting',
    description: 'Monthly elder board meeting to discuss church business',
    type: 'meeting',
    status: 'approved',
    startDate: '2024-01-23',
    endDate: '2024-01-23',
    startTime: '19:00',
    endTime: '21:00',
    isAllDay: false,
    timezone: 'America/Chicago',
    recurrence: 'monthly',
    roomId: 'fac-3',
    roomName: 'Conference Room A',
    isOffsite: false,
    expectedAttendance: 12,
    rsvpEnabled: false,
    rsvpCount: { attending: 0, maybe: 0, declined: 0 },
    organizerId: 'user-1',
    organizerName: 'Pastor Michael Chen',
    equipmentRequests: [],
    requiresApproval: false,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'evt-5',
    title: 'Community Outreach - Food Drive',
    description: 'Monthly food drive to support local food bank. Volunteers needed for sorting and distribution.',
    type: 'outreach',
    status: 'pending_approval',
    startDate: '2024-02-03',
    endDate: '2024-02-03',
    startTime: '08:00',
    endTime: '14:00',
    isAllDay: false,
    timezone: 'America/Chicago',
    recurrence: 'monthly',
    roomId: 'fac-6',
    roomName: 'Outdoor Pavilion',
    isOffsite: false,
    expectedAttendance: 50,
    rsvpEnabled: true,
    rsvpCount: { attending: 28, maybe: 10, declined: 0 },
    departmentName: 'Outreach Ministry',
    organizerId: 'user-4',
    organizerName: 'Maria Santos',
    contactEmail: 'outreach@gracechurch.org',
    equipmentRequests: [
      { id: 'er-2', equipmentId: 'eq-3', equipmentName: 'Rectangular Tables (8\')', quantity: 8, eventId: 'evt-5', status: 'pending', requestedBy: 'user-4', requestedAt: '2024-01-18T00:00:00Z' }
    ],
    requiresApproval: true,
    approvalId: 'apr-1',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z'
  },
  {
    id: 'evt-6',
    title: 'Worship Team Rehearsal',
    description: 'Weekly rehearsal for Sunday worship',
    type: 'rehearsal',
    status: 'approved',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    startTime: '19:00',
    endTime: '21:00',
    isAllDay: false,
    timezone: 'America/Chicago',
    recurrence: 'weekly',
    roomId: 'fac-1',
    roomName: 'Main Sanctuary',
    isOffsite: false,
    expectedAttendance: 15,
    rsvpEnabled: false,
    rsvpCount: { attending: 0, maybe: 0, declined: 0 },
    departmentName: 'Worship Ministry',
    organizerId: 'user-5',
    organizerName: 'Rachel Thompson',
    equipmentRequests: [],
    requiresApproval: false,
    linkedServiceId: 'srv-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockReservations: FacilityReservation[] = [
  {
    id: 'res-1',
    facilityId: 'fac-1',
    facilityName: 'Main Sanctuary',
    eventId: 'evt-1',
    eventTitle: 'Sunday Morning Worship',
    date: '2024-01-21',
    startTime: '10:00',
    endTime: '12:00',
    setupStartTime: '09:30',
    cleanupEndTime: '12:30',
    status: 'approved',
    requestedBy: 'Pastor Michael Chen',
    requestedAt: '2024-01-01T00:00:00Z',
    approvedBy: 'System',
    approvedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'res-2',
    facilityId: 'fac-2',
    facilityName: 'Fellowship Hall',
    eventId: 'evt-2',
    eventTitle: 'Women\'s Ministry Brunch',
    date: '2024-01-27',
    startTime: '09:30',
    endTime: '12:00',
    setupStartTime: '09:15',
    cleanupEndTime: '12:30',
    status: 'approved',
    requestedBy: 'Jennifer Martinez',
    requestedAt: '2024-01-10T00:00:00Z',
    approvedBy: 'Admin',
    approvedAt: '2024-01-11T00:00:00Z'
  }
];

export const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: 'apr-1',
    type: 'event',
    referenceId: 'evt-5',
    title: 'Community Outreach - Food Drive',
    description: 'Monthly food drive event requiring outdoor pavilion and tables',
    requestedBy: 'user-4',
    requestedByName: 'Maria Santos',
    requestedAt: '2024-01-18T10:30:00Z',
    status: 'pending',
    priority: 'normal'
  },
  {
    id: 'apr-2',
    type: 'room',
    referenceId: 'res-3',
    title: 'Chapel Reservation - Wedding Rehearsal',
    description: 'Request to reserve Chapel for wedding rehearsal on Feb 10',
    requestedBy: 'user-6',
    requestedByName: 'Thomas Anderson',
    requestedAt: '2024-01-17T14:00:00Z',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'apr-3',
    type: 'equipment',
    referenceId: 'er-3',
    title: 'Sound System for Off-site Event',
    description: 'Portable sound system needed for community park outreach',
    requestedBy: 'user-4',
    requestedByName: 'Maria Santos',
    requestedAt: '2024-01-16T09:00:00Z',
    status: 'pending',
    priority: 'normal'
  }
];

export const mockRSVPs: EventRSVP[] = [
  { id: 'rsvp-1', eventId: 'evt-2', personId: 'p-1', personName: 'Sarah Johnson', personEmail: 'sarah@email.com', status: 'attending', guestCount: 1, respondedAt: '2024-01-15T00:00:00Z' },
  { id: 'rsvp-2', eventId: 'evt-2', personId: 'p-2', personName: 'Emily Davis', personEmail: 'emily@email.com', status: 'attending', guestCount: 2, dietaryRestrictions: 'Vegetarian', respondedAt: '2024-01-14T00:00:00Z' },
  { id: 'rsvp-3', eventId: 'evt-2', personId: 'p-3', personName: 'Lisa Chen', status: 'maybe', guestCount: 0, respondedAt: '2024-01-16T00:00:00Z' },
  { id: 'rsvp-4', eventId: 'evt-3', personId: 'p-4', personName: 'Jake Wilson', status: 'attending', guestCount: 0, respondedAt: '2024-01-18T00:00:00Z' },
  { id: 'rsvp-5', eventId: 'evt-3', personId: 'p-5', personName: 'Emma Thompson', status: 'attending', guestCount: 0, respondedAt: '2024-01-17T00:00:00Z' }
];

// Helper to get event type colors
export const eventTypeColors: Record<string, string> = {
  worship_service: 'hsl(var(--primary))',
  meeting: 'hsl(var(--muted-foreground))',
  class: 'hsl(262, 83%, 58%)',
  special_event: 'hsl(45, 93%, 47%)',
  rehearsal: 'hsl(199, 89%, 48%)',
  outreach: 'hsl(142, 71%, 45%)',
  fellowship: 'hsl(330, 81%, 60%)'
};

// Convert events to calendar format
export const getCalendarEvents = (events: Event[]): CalendarEvent[] => {
  return events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(`${event.startDate}T${event.startTime}`),
    end: new Date(`${event.endDate}T${event.endTime}`),
    type: event.type,
    status: event.status,
    roomName: event.roomName,
    color: eventTypeColors[event.type] || 'hsl(var(--muted))'
  }));
};

// Check for room conflicts
export const checkRoomConflict = (
  roomId: string,
  date: string,
  startTime: string,
  endTime: string,
  excludeEventId?: string
): { hasConflict: boolean; conflictingEvent?: string } => {
  const conflict = mockEvents.find(event => 
    event.roomId === roomId &&
    event.startDate === date &&
    event.id !== excludeEventId &&
    event.status !== 'cancelled' &&
    event.status !== 'rejected' &&
    ((startTime >= event.startTime && startTime < event.endTime) ||
     (endTime > event.startTime && endTime <= event.endTime) ||
     (startTime <= event.startTime && endTime >= event.endTime))
  );
  
  return {
    hasConflict: !!conflict,
    conflictingEvent: conflict?.title
  };
};

// Get available time slots for a room on a date
export const getAvailableSlots = (roomId: string, date: string): { start: string; end: string; event?: string }[] => {
  const bookedSlots = mockEvents
    .filter(e => e.roomId === roomId && e.startDate === date && e.status !== 'cancelled')
    .map(e => ({ start: e.startTime, end: e.endTime, event: e.title }));
  
  return bookedSlots.sort((a, b) => a.start.localeCompare(b.start));
};
