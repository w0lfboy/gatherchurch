// Core data types for the Groups module

export type GroupType = 'small_group' | 'class' | 'ministry_team' | 'volunteer_team';
export type GroupStatus = 'active' | 'paused' | 'archived' | 'forming';
export type MeetingFrequency = 'weekly' | 'bi_weekly' | 'monthly' | 'varies';
export type MemberRole = 'leader' | 'co_leader' | 'host' | 'member';
export type JoinRequestStatus = 'pending' | 'approved' | 'declined';

export interface Group {
  id: string;
  name: string;
  description?: string;
  type: GroupType;
  status: GroupStatus;
  category?: string;
  tags: string[];
  
  // Meeting details
  meetingDay?: string;
  meetingTime?: string;
  meetingFrequency: MeetingFrequency;
  location?: GroupLocation;
  isOnline: boolean;
  meetingLink?: string;
  
  // Capacity
  maxMembers?: number;
  currentMembers: number;
  
  // Features
  hasChildcare: boolean;
  childcareAges?: string;
  openEnrollment: boolean;
  
  // Leaders
  primaryLeaderId: string;
  primaryLeaderName: string;
  
  // Media
  imageUrl?: string;
  
  // Dates
  startDate?: string;
  endDate?: string;
  nextMeeting?: string;
  
  createdAt: string;
}

export interface GroupLocation {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  isChurchCampus: boolean;
  roomName?: string;
}

export interface GroupMember {
  id: string;
  groupId: string;
  personId: string;
  personName: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role: MemberRole;
  joinedAt: string;
  attendanceRate?: number;
  lastAttended?: string;
}

export interface GroupSession {
  id: string;
  groupId: string;
  date: string;
  topic?: string;
  notes?: string;
  attendees: SessionAttendee[];
  totalPresent: number;
  totalAbsent: number;
  createdAt: string;
}

export interface SessionAttendee {
  memberId: string;
  memberName: string;
  status: 'present' | 'absent' | 'excused';
}

export interface JoinRequest {
  id: string;
  groupId: string;
  groupName: string;
  personId: string;
  personName: string;
  personEmail?: string;
  message?: string;
  status: JoinRequestStatus;
  requestedAt: string;
  respondedAt?: string;
  respondedBy?: string;
}

export interface GroupEvent {
  id: string;
  groupId: string;
  groupName: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime?: string;
  location?: string;
  isRecurring: boolean;
  rsvpEnabled: boolean;
  rsvpCount?: number;
}

export interface GroupResource {
  id: string;
  title: string;
  description?: string;
  type: 'curriculum' | 'video' | 'pdf' | 'link' | 'audio';
  url?: string;
  fileSize?: string;
  duration?: string;
  category?: string;
  tags: string[];
  assignedGroups: string[];
  downloads: number;
  createdAt: string;
}

export interface GroupMessage {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  subject?: string;
  content: string;
  sentVia: 'email' | 'sms' | 'both';
  recipientCount: number;
  sentAt: string;
}

export interface GroupCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
  groupCount: number;
}

// Filter types for group search
export interface GroupFilter {
  search?: string;
  type?: GroupType[];
  category?: string[];
  meetingDay?: string[];
  hasChildcare?: boolean;
  isOnline?: boolean;
  openEnrollment?: boolean;
  tags?: string[];
}
