export type ServiceItemType = 'song' | 'announcement' | 'prayer' | 'message' | 'offering' | 'video' | 'other';

export interface SongArrangement {
  id: string;
  name: string; // e.g., "Full Band", "Acoustic", "Keys Only"
  key: string;
  tempo: number;
  duration: number; // in seconds
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
  duration: number; // in seconds
  arrangements: SongArrangement[];
  tags: string[];
  lastUsed?: string;
  timesUsed: number;
  ccliNumber?: string;
  lyrics?: string;
}

export interface ServiceItem {
  id: string;
  type: ServiceItemType;
  title: string;
  duration: number; // in seconds
  assignee?: string;
  notes?: string;
  songId?: string;
  arrangementId?: string;
  selectedKey?: string;
  order: number;
}

export interface ServiceVolunteer {
  id: string;
  personId: string;
  personName: string;
  role: string;
  status: 'pending' | 'confirmed' | 'declined';
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  date: string;
  time: string;
  linkedServiceId?: string; // If this is a linked copy
  isLinked: boolean; // Whether changes sync to linked services
  items: ServiceItem[];
  volunteers: ServiceVolunteer[];
  notes?: string;
  status: 'draft' | 'planning' | 'confirmed' | 'completed';
}

export interface ServiceTemplate {
  id: string;
  name: string;
  description: string;
  items: Omit<ServiceItem, 'id'>[];
}
