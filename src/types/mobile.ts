export type AppMode = 'member' | 'leader';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: AppMode[];
  primaryRole: AppMode;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  seriesName?: string;
  description?: string;
  videoUrl?: string;
  audioUrl?: string;
  notesUrl?: string;
  thumbnail?: string;
}

export interface ConnectCard {
  id: string;
  type: 'first_time' | 'prayer_request' | 'decision' | 'contact_update' | 'volunteer_interest';
  submittedAt: string;
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  status: 'new' | 'reviewed' | 'followed_up';
}

export interface MySundayShift {
  id: string;
  date: string;
  serviceName: string;
  serviceTime: string;
  teamName: string;
  position: string;
  checkInTime?: string;
  notes?: string;
}

export interface PushNotificationPreferences {
  eventReminders: boolean;
  volunteerReminders: boolean;
  groupMessages: boolean;
  announcements: boolean;
  prayerRequests: boolean;
  givingReceipts: boolean;
}

export interface MobileNavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}
