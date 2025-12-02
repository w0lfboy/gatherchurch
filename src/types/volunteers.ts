export type TeamCategory = 'worship' | 'kids' | 'hospitality' | 'tech' | 'facilities' | 'admin';

export interface Team {
  id: string;
  name: string;
  category: TeamCategory;
  description: string;
  leaderId: string;
  leaderName: string;
  memberCount: number;
  color: string;
}

export interface TeamRole {
  id: string;
  teamId: string;
  name: string;
  description: string;
  minVolunteers: number;
  maxVolunteers: number;
  requiresBackgroundCheck: boolean;
  skills: string[];
}

export interface VolunteerProfile {
  id: string;
  personId: string;
  personName: string;
  email: string;
  phone: string;
  teams: string[]; // team IDs
  roles: string[]; // role IDs
  skills: string[];
  preferredServiceTime?: '9am' | '11am' | 'either';
  maxServicesPerMonth: number;
  servicesThisMonth: number;
  status: 'active' | 'inactive' | 'onboarding' | 'on-leave';
  familyMembers?: string[]; // person IDs for family scheduling
  notes?: string;
  joinedDate: string;
  lastServed?: string;
}

export interface BlackoutDate {
  id: string;
  volunteerId: string;
  startDate: string;
  endDate: string;
  reason?: string;
  isRecurring: boolean;
  recurringPattern?: 'weekly' | 'monthly';
}

export interface ScheduledShift {
  id: string;
  serviceId: string;
  serviceDate: string;
  serviceTime: string;
  teamId: string;
  roleId: string;
  volunteerId: string;
  volunteerName: string;
  status: 'pending' | 'confirmed' | 'declined' | 'swap-requested' | 'covered';
  confirmedAt?: string;
  declinedAt?: string;
  declineReason?: string;
  reminderSent: boolean;
  lastReminderAt?: string;
}

export interface SwapRequest {
  id: string;
  shiftId: string;
  requesterId: string;
  requesterName: string;
  requestType: 'swap' | 'sub';
  status: 'open' | 'pending-approval' | 'approved' | 'denied' | 'completed';
  reason: string;
  suggestedReplacements: SuggestedReplacement[];
  acceptedById?: string;
  acceptedByName?: string;
  swapWithShiftId?: string; // for swap type
  createdAt: string;
  updatedAt: string;
}

export interface SuggestedReplacement {
  volunteerId: string;
  volunteerName: string;
  matchScore: number; // 0-100 based on availability, skills, history
  reasons: string[];
  isAvailable: boolean;
  lastServed?: string;
  servicesThisMonth: number;
}

export interface ScheduleTemplate {
  id: string;
  name: string;
  teamId: string;
  roles: {
    roleId: string;
    minVolunteers: number;
    preferredVolunteers?: string[];
  }[];
}

export interface Notification {
  id: string;
  volunteerId: string;
  type: 'schedule' | 'reminder' | 'swap-request' | 'confirmation' | 'team-update';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}
