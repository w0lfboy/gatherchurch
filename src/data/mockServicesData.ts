import { Song, Service, ServiceTemplate, SongArrangement, ServiceType, ServicesStats } from '@/types/services';

// Service Types
export const mockServiceTypes: ServiceType[] = [
  {
    id: 'st1',
    name: 'Contemporary',
    color: 'hsl(145 25% 38%)',
    description: 'Modern worship with full band',
    defaultStartTime: '09:00',
    isActive: true,
  },
  {
    id: 'st2',
    name: 'Traditional',
    color: 'hsl(220 30% 45%)',
    description: 'Classic hymns with choir',
    defaultStartTime: '11:00',
    isActive: true,
  },
  {
    id: 'st3',
    name: 'Youth',
    color: 'hsl(280 40% 50%)',
    description: 'Youth ministry service',
    defaultStartTime: '18:00',
    isActive: true,
  },
  {
    id: 'st4',
    name: 'Evening Worship',
    color: 'hsl(15 65% 55%)',
    description: 'Intimate evening gathering',
    defaultStartTime: '19:00',
    isActive: true,
  },
];

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Good Good Father',
    artist: 'Chris Tomlin',
    defaultKey: 'G',
    defaultTempo: 68,
    duration: 300,
    arrangements: [
      { id: 'arr-1', name: 'Full Band', key: 'G', tempo: 68, duration: 300, notes: 'Standard arrangement' },
      { id: 'arr-2', name: 'Acoustic', key: 'G', tempo: 66, duration: 280, notes: 'Stripped back, guitar-led' },
    ],
    tags: ['worship', 'slow', 'intimate'],
    lastUsed: '2024-12-08',
    timesUsed: 45,
    ccliNumber: '7036612',
    availableKeys: ['F', 'G', 'A'],
    tempo: 'slow',
    bpm: 68,
    isActive: true,
  },
  {
    id: 'song-2',
    title: 'Way Maker',
    artist: 'Sinach',
    defaultKey: 'E',
    defaultTempo: 68,
    duration: 360,
    arrangements: [
      { id: 'arr-3', name: 'Full Band', key: 'E', tempo: 68, duration: 360 },
      { id: 'arr-4', name: 'Keys Only', key: 'D', tempo: 65, duration: 340 },
    ],
    tags: ['worship', 'declaration', 'powerful'],
    lastUsed: '2024-12-01',
    timesUsed: 38,
    ccliNumber: '7115744',
    availableKeys: ['D', 'E', 'F'],
    tempo: 'medium',
    bpm: 68,
    isActive: true,
  },
  {
    id: 'song-3',
    title: 'Build My Life',
    artist: 'Housefires',
    defaultKey: 'E',
    defaultTempo: 72,
    duration: 330,
    arrangements: [
      { id: 'arr-5', name: 'Full Band', key: 'E', tempo: 72, duration: 330 },
    ],
    tags: ['worship', 'building', 'anthem'],
    lastUsed: '2024-11-24',
    timesUsed: 52,
    ccliNumber: '7070345',
    availableKeys: ['D', 'E', 'F', 'G'],
    tempo: 'medium',
    bpm: 72,
    isActive: true,
  },
  {
    id: 'song-4',
    title: 'King of Kings',
    artist: 'Hillsong Worship',
    defaultKey: 'D',
    defaultTempo: 66,
    duration: 290,
    arrangements: [
      { id: 'arr-6', name: 'Full Band', key: 'D', tempo: 66, duration: 290 },
      { id: 'arr-7', name: 'Acoustic', key: 'C', tempo: 64, duration: 270 },
    ],
    tags: ['worship', 'majestic', 'christmas'],
    lastUsed: '2024-12-08',
    timesUsed: 28,
    ccliNumber: '7127647',
    availableKeys: ['C', 'D', 'E'],
    tempo: 'medium',
    bpm: 66,
    isActive: true,
  },
  {
    id: 'song-5',
    title: 'Graves Into Gardens',
    artist: 'Elevation Worship',
    defaultKey: 'C',
    defaultTempo: 74,
    duration: 320,
    arrangements: [
      { id: 'arr-8', name: 'Full Band', key: 'C', tempo: 74, duration: 320 },
    ],
    tags: ['worship', 'powerful', 'resurrection'],
    lastUsed: '2024-11-17',
    timesUsed: 22,
    ccliNumber: '7138219',
    availableKeys: ['B', 'C', 'D'],
    tempo: 'medium',
    bpm: 74,
    isActive: true,
  },
  {
    id: 'song-6',
    title: 'O Come All Ye Faithful',
    artist: 'Traditional',
    defaultKey: 'G',
    defaultTempo: 100,
    duration: 240,
    arrangements: [
      { id: 'arr-9', name: 'Full Band', key: 'G', tempo: 100, duration: 240 },
      { id: 'arr-10', name: 'Choir', key: 'A', tempo: 96, duration: 260 },
    ],
    tags: ['christmas', 'hymn', 'traditional'],
    timesUsed: 15,
    ccliNumber: '31054',
    availableKeys: ['F', 'G', 'A'],
    tempo: 'fast',
    bpm: 100,
    isActive: true,
  },
  {
    id: 'song-7',
    title: 'Great Are You Lord',
    artist: 'All Sons & Daughters',
    defaultKey: 'C',
    defaultTempo: 72,
    duration: 285,
    arrangements: [
      { id: 'arr-11', name: 'Full Band', key: 'C', tempo: 72, duration: 285 },
    ],
    tags: ['worship', 'reflective', 'atmospheric'],
    lastUsed: '2026-01-05',
    timesUsed: 8,
    ccliNumber: '6460220',
    availableKeys: ['C', 'D', 'E'],
    tempo: 'slow',
    bpm: 72,
    isActive: true,
  },
  {
    id: 'song-8',
    title: 'Living Hope',
    artist: 'Phil Wickham',
    defaultKey: 'D',
    defaultTempo: 74,
    duration: 372,
    arrangements: [
      { id: 'arr-12', name: 'Full Band', key: 'D', tempo: 74, duration: 372 },
    ],
    tags: ['worship', 'powerful', 'resurrection'],
    lastUsed: '2025-12-29',
    timesUsed: 7,
    ccliNumber: '7106807',
    availableKeys: ['C', 'D', 'E'],
    tempo: 'medium',
    bpm: 74,
    isActive: true,
  },
];

export const mockServices: Service[] = [
  {
    id: 'service-1',
    name: 'Sunday Morning',
    date: '2026-01-19',
    time: '9:00 AM',
    endTime: '10:15 AM',
    isLinked: true,
    status: 'scheduled',
    serviceType: mockServiceTypes[0],
    seriesName: 'New Beginnings',
    seriesWeek: 3,
    items: [
      { id: 'item-1', type: 'header', title: 'Pre-Service', duration: 0, order: 0, section: 'pre-service' },
      { id: 'item-2', type: 'custom', title: 'Doors Open', duration: 300, order: 1, section: 'pre-service' },
      { id: 'item-3', type: 'custom', title: 'Band Soundcheck', duration: 600, order: 2, section: 'pre-service' },
      { id: 'item-4', type: 'header', title: 'Worship Set', duration: 0, order: 3, section: 'worship' },
      { id: 'item-5', type: 'song', title: 'Build My Life', duration: 330, songId: 'song-3', arrangementId: 'arr-5', selectedKey: 'G', order: 4, section: 'worship', assignee: 'Sarah Mitchell' },
      { id: 'item-6', type: 'song', title: 'Great Are You Lord', duration: 285, songId: 'song-7', arrangementId: 'arr-11', selectedKey: 'C', order: 5, section: 'worship', assignee: 'Sarah Mitchell' },
      { id: 'item-7', type: 'song', title: 'Living Hope', duration: 372, songId: 'song-8', arrangementId: 'arr-12', selectedKey: 'D', order: 6, section: 'worship', assignee: 'Sarah Mitchell' },
      { id: 'item-8', type: 'header', title: 'Message', duration: 0, order: 7, section: 'message' },
      { id: 'item-9', type: 'scripture', title: 'Romans 8:1-11', duration: 180, order: 8, section: 'message' },
      { id: 'item-10', type: 'message', title: 'New Beginnings: Week 3', duration: 2100, assignee: 'Pastor Mike', order: 9, section: 'message', description: 'Walking in Freedom' },
      { id: 'item-11', type: 'header', title: 'Response', duration: 0, order: 10, section: 'response' },
      { id: 'item-12', type: 'song', title: 'What A Beautiful Name', duration: 364, songId: 'song-4', selectedKey: 'D', order: 11, section: 'response', assignee: 'Sarah Mitchell' },
      { id: 'item-13', type: 'prayer', title: 'Closing Prayer', duration: 120, order: 12, section: 'response' },
      { id: 'item-14', type: 'announcement', title: 'Announcements', duration: 180, order: 13, section: 'response' },
    ],
    volunteers: [
      { id: 'vol-1', personId: 'person-1', personName: 'Sarah Mitchell', role: 'Worship Leader', status: 'confirmed' },
      { id: 'vol-2', personId: 'person-2', personName: 'Jessica Taylor', role: 'Lead Vocal', status: 'confirmed' },
      { id: 'vol-3', personId: 'person-3', personName: 'Mike Rodriguez', role: 'Background Vocal', status: 'pending' },
      { id: 'vol-4', personId: 'person-4', personName: 'David Kim', role: 'Acoustic Guitar', status: 'confirmed' },
      { id: 'vol-5', personId: 'person-5', personName: 'Chris Lopez', role: 'Electric Guitar', status: 'declined' },
      { id: 'vol-6', personId: 'person-6', personName: 'Nathan Park', role: 'Bass', status: 'confirmed' },
      { id: 'vol-7', personId: 'person-7', personName: 'Amy Wang', role: 'Drums', status: 'pending' },
      { id: 'vol-8', personId: 'person-8', personName: 'Tyler Brooks', role: 'Sound', status: 'confirmed' },
      { id: 'vol-9', personId: 'person-9', personName: 'Amanda Chen', role: 'Lights', status: 'confirmed' },
      { id: 'vol-10', personId: 'person-10', personName: 'Josh Martinez', role: 'ProPresenter', status: 'pending' },
    ],
    notes: 'Theme: Fresh starts in the new year',
  },
  {
    id: 'service-2',
    name: 'Sunday Morning',
    date: '2026-01-19',
    time: '11:00 AM',
    endTime: '12:15 PM',
    linkedServiceId: 'service-1',
    isLinked: true,
    status: 'scheduled',
    serviceType: mockServiceTypes[0],
    seriesName: 'New Beginnings',
    seriesWeek: 3,
    items: [],
    volunteers: [],
    notes: 'Theme: Fresh starts in the new year',
  },
  {
    id: 'service-3',
    name: 'Sunday Morning',
    date: '2026-01-26',
    time: '9:00 AM',
    endTime: '10:15 AM',
    isLinked: true,
    status: 'draft',
    serviceType: mockServiceTypes[0],
    seriesName: 'New Beginnings',
    seriesWeek: 4,
    items: [],
    volunteers: [
      { id: 'vol-11', personId: 'person-2', personName: 'Mike Rodriguez', role: 'Worship Leader', status: 'pending' },
      { id: 'vol-12', personId: 'person-4', personName: 'David Kim', role: 'Acoustic Guitar', status: 'pending' },
      { id: 'vol-13', personId: 'person-6', personName: 'Nathan Park', role: 'Bass', status: 'confirmed' },
      { id: 'vol-14', personId: 'person-8', personName: 'Tyler Brooks', role: 'Sound', status: 'confirmed' },
    ],
    notes: 'Fourth Sunday of Advent - Love theme',
  },
  {
    id: 'service-4',
    name: 'Sunday Morning',
    date: '2026-02-02',
    time: '9:00 AM',
    endTime: '10:15 AM',
    isLinked: true,
    status: 'draft',
    serviceType: mockServiceTypes[0],
    items: [],
    volunteers: [
      { id: 'vol-15', personId: 'person-1', personName: 'Sarah Mitchell', role: 'Worship Leader', status: 'pending' },
      { id: 'vol-16', personId: 'person-8', personName: 'Tyler Brooks', role: 'Sound', status: 'pending' },
    ],
  },
  {
    id: 'service-5',
    name: 'Sunday Morning',
    date: '2026-02-09',
    time: '9:00 AM',
    endTime: '10:15 AM',
    isLinked: true,
    status: 'draft',
    serviceType: mockServiceTypes[0],
    items: [],
    volunteers: [],
  },
];

export const mockTemplates: ServiceTemplate[] = [
  {
    id: 'template-1',
    name: 'Standard Sunday',
    description: 'Regular Sunday morning service format',
    items: [
      { type: 'header', title: 'Pre-Service', duration: 0, order: 0, section: 'pre-service' },
      { type: 'custom', title: 'Doors Open', duration: 300, order: 1, section: 'pre-service' },
      { type: 'header', title: 'Worship Set', duration: 0, order: 2, section: 'worship' },
      { type: 'song', title: 'Opening Song', duration: 300, order: 3, section: 'worship' },
      { type: 'song', title: 'Worship Song 2', duration: 300, order: 4, section: 'worship' },
      { type: 'song', title: 'Worship Song 3', duration: 300, order: 5, section: 'worship' },
      { type: 'header', title: 'Message', duration: 0, order: 6, section: 'message' },
      { type: 'announcement', title: 'Announcements', duration: 300, order: 7, section: 'message' },
      { type: 'offering', title: 'Offering', duration: 240, order: 8, section: 'message' },
      { type: 'message', title: 'Message', duration: 2100, order: 9, section: 'message' },
      { type: 'header', title: 'Response', duration: 0, order: 10, section: 'response' },
      { type: 'song', title: 'Closing Song', duration: 300, order: 11, section: 'response' },
      { type: 'prayer', title: 'Closing Prayer', duration: 180, order: 12, section: 'response' },
    ],
  },
  {
    id: 'template-2',
    name: 'Worship Night',
    description: 'Extended worship evening format',
    items: [
      { type: 'song', title: 'Opening Set', duration: 900, order: 0, section: 'worship' },
      { type: 'prayer', title: 'Prayer Time', duration: 600, order: 1, section: 'worship' },
      { type: 'song', title: 'Worship Set', duration: 1800, order: 2, section: 'worship' },
      { type: 'message', title: 'Short Message', duration: 900, order: 3, section: 'message' },
      { type: 'song', title: 'Response', duration: 600, order: 4, section: 'response' },
    ],
  },
];

export const mockServicesStats: ServicesStats = {
  totalServicesPlanned: 156,
  activeVolunteers: 48,
  songsInLibrary: 234,
  acceptRate: 94,
};

export const availableKeys = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${mins} min`;
};

export const formatDurationLong = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
};

export const formatServiceDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatTime = (time: string): string => {
  if (time.includes('AM') || time.includes('PM')) return time;
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const isThisWeek = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  return date >= startOfWeek && date < endOfWeek;
};
