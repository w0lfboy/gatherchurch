export type ServiceItemType = 'song' | 'announcement' | 'prayer' | 'message' | 'offering' | 'video' | 'header' | 'scripture' | 'media' | 'custom' | 'other';

export type ServiceSection = 'pre-service' | 'worship' | 'message' | 'response' | 'main';

export interface SongArrangement {
  id: string;
  name: string;
  key: string;
  tempo: number;
  duration: number;
  chordChartUrl?: string;
  mp3Url?: string;
  notes?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  defaultKey: string;
  defaultTempo: number;
  duration: number;
  arrangements: SongArrangement[];
  tags: string[];
  lastUsed?: string;
  timesUsed: number;
  ccliNumber?: string;
  lyrics?: string;
  availableKeys?: string[];
  tempo?: 'slow' | 'medium' | 'fast';
  bpm?: number;
  isActive?: boolean;
}

export interface ServiceItem {
  id: string;
  type: ServiceItemType;
  title: string;
  duration: number;
  assignee?: string;
  notes?: string;
  songId?: string;
  arrangementId?: string;
  selectedKey?: string;
  order: number;
  section?: ServiceSection;
  description?: string;
}

export interface ServiceVolunteer {
  id: string;
  personId: string;
  personName: string;
  role: string;
  status: 'pending' | 'confirmed' | 'declined';
  notes?: string;
  avatarUrl?: string;
}

export interface ServiceType {
  id: string;
  name: string;
  color: string;
  description?: string;
  defaultStartTime?: string;
  isActive: boolean;
}

export interface Service {
  id: string;
  name: string;
  date: string;
  time: string;
  endTime?: string;
  linkedServiceId?: string;
  isLinked: boolean;
  items: ServiceItem[];
  volunteers: ServiceVolunteer[];
  notes?: string;
  status: 'draft' | 'planning' | 'scheduled' | 'confirmed' | 'live' | 'completed';
  serviceType?: ServiceType;
  seriesName?: string;
  seriesWeek?: number;
}

export interface ServiceTemplate {
  id: string;
  name: string;
  description: string;
  items: Omit<ServiceItem, 'id'>[];
}

export interface ServicesStats {
  totalServicesPlanned: number;
  activeVolunteers: number;
  songsInLibrary: number;
  acceptRate: number;
}
