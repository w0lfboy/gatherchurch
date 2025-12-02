// Core data types for the Events & Facility Management module

export type EventStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'cancelled' | 'completed';
export type EventType = 'worship_service' | 'meeting' | 'class' | 'special_event' | 'rehearsal' | 'outreach' | 'fellowship';
export type RecurrencePattern = 'none' | 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'custom';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'needs_revision';
export type RSVPStatus = 'attending' | 'maybe' | 'declined' | 'no_response';
export type EquipmentStatus = 'available' | 'reserved' | 'in_use' | 'maintenance' | 'retired';

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  status: EventStatus;
  
  // Timing
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  timezone: string;
  
  // Recurrence
  recurrence: RecurrencePattern;
  recurrenceEndDate?: string;
  
  // Location
  roomId?: string;
  roomName?: string;
  isOffsite: boolean;
  offsiteAddress?: string;
  virtualLink?: string;
  
  // Capacity & RSVPs
  expectedAttendance?: number;
  maxCapacity?: number;
  rsvpEnabled: boolean;
  rsvpDeadline?: string;
  rsvpCount: {
    attending: number;
    maybe: number;
    declined: number;
  };
  
  // Organization
  departmentId?: string;
  departmentName?: string;
  groupId?: string;
  groupName?: string;
  
  // People
  organizerId: string;
  organizerName: string;
  contactEmail?: string;
  contactPhone?: string;
  
  // Integration flags
  linkedServiceId?: string;
  linkedCheckInSessionId?: string;
  
  // Media
  imageUrl?: string;
  flyerUrl?: string;
  
  // Equipment
  equipmentRequests: EquipmentRequest[];
  
  // Approval
  requiresApproval: boolean;
  approvalId?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Facility {
  id: string;
  name: string;
  building?: string;
  floor?: string;
  capacity: number;
  description?: string;
  amenities: string[];
  imageUrl?: string;
  isActive: boolean;
  hourlyRate?: number;
  requiresApproval: boolean;
  allowedEventTypes: EventType[];
  setupTimeMinutes: number;
  cleanupTimeMinutes: number;
}

export interface FacilityReservation {
  id: string;
  facilityId: string;
  facilityName: string;
  eventId: string;
  eventTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  setupStartTime: string;
  cleanupEndTime: string;
  status: ApprovalStatus;
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  description?: string;
  quantity: number;
  availableQuantity: number;
  location: string;
  status: EquipmentStatus;
  imageUrl?: string;
  notes?: string;
}

export interface EquipmentRequest {
  id: string;
  equipmentId: string;
  equipmentName: string;
  quantity: number;
  eventId: string;
  status: ApprovalStatus;
  requestedBy: string;
  requestedAt: string;
  notes?: string;
}

export interface EventRSVP {
  id: string;
  eventId: string;
  personId: string;
  personName: string;
  personEmail?: string;
  status: RSVPStatus;
  guestCount: number;
  dietaryRestrictions?: string;
  notes?: string;
  respondedAt: string;
}

export interface ApprovalRequest {
  id: string;
  type: 'event' | 'room' | 'equipment';
  referenceId: string;
  title: string;
  description?: string;
  requestedBy: string;
  requestedByName: string;
  requestedAt: string;
  status: ApprovalStatus;
  reviewedBy?: string;
  reviewedByName?: string;
  reviewedAt?: string;
  comments?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

export interface EventReminder {
  id: string;
  eventId: string;
  type: 'email' | 'sms' | 'push';
  scheduledFor: string;
  sent: boolean;
  sentAt?: string;
  recipientCount: number;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  conflictingEvent?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  status: EventStatus;
  roomName?: string;
  color: string;
}
