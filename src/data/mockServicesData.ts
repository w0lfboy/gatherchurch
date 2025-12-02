import { Song, Service, ServiceTemplate, SongArrangement } from '@/types/services';

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
  },
];

export const mockServices: Service[] = [
  {
    id: 'service-1',
    name: 'Sunday Morning',
    date: '2024-12-15',
    time: '9:00 AM',
    isLinked: true,
    status: 'planning',
    items: [
      { id: 'item-1', type: 'other', title: 'Pre-Service Prayer', duration: 900, assignee: 'Worship Team', order: 0 },
      { id: 'item-2', type: 'song', title: 'Good Good Father', duration: 300, songId: 'song-1', arrangementId: 'arr-1', selectedKey: 'G', order: 1 },
      { id: 'item-3', type: 'song', title: 'Way Maker', duration: 360, songId: 'song-2', arrangementId: 'arr-3', selectedKey: 'E', order: 2 },
      { id: 'item-4', type: 'song', title: 'Build My Life', duration: 330, songId: 'song-3', arrangementId: 'arr-5', selectedKey: 'E', order: 3 },
      { id: 'item-5', type: 'announcement', title: 'Announcements', duration: 300, assignee: 'Sarah Mitchell', order: 4 },
      { id: 'item-6', type: 'offering', title: 'Offering', duration: 240, order: 5 },
      { id: 'item-7', type: 'message', title: 'Hope for the Holidays', duration: 2100, assignee: 'Pastor John', order: 6, notes: 'Series: Advent Week 3' },
      { id: 'item-8', type: 'song', title: 'King of Kings', duration: 290, songId: 'song-4', arrangementId: 'arr-6', selectedKey: 'D', order: 7 },
      { id: 'item-9', type: 'prayer', title: 'Closing Prayer', duration: 180, assignee: 'Pastor John', order: 8 },
    ],
    volunteers: [
      { id: 'vol-1', personId: 'person-1', personName: 'Michael Chen', role: 'Worship Leader', status: 'confirmed' },
      { id: 'vol-2', personId: 'person-2', personName: 'Emily Rodriguez', role: 'Vocals', status: 'confirmed' },
      { id: 'vol-3', personId: 'person-3', personName: 'James Wilson', role: 'Electric Guitar', status: 'pending' },
      { id: 'vol-4', personId: 'person-4', personName: 'Rachel Green', role: 'Keys', status: 'confirmed' },
      { id: 'vol-5', personId: 'person-5', personName: 'David Kim', role: 'Drums', status: 'confirmed' },
      { id: 'vol-6', personId: 'person-6', personName: 'Sarah Mitchell', role: 'Announcements', status: 'confirmed' },
      { id: 'vol-7', personId: 'person-7', personName: 'Tom Davis', role: 'Sound', status: 'pending' },
      { id: 'vol-8', personId: 'person-8', personName: 'Lisa Park', role: 'ProPresenter', status: 'confirmed' },
    ],
    notes: 'Third Sunday of Advent - Joy theme',
  },
  {
    id: 'service-2',
    name: 'Sunday Morning',
    date: '2024-12-15',
    time: '11:00 AM',
    linkedServiceId: 'service-1',
    isLinked: true,
    status: 'planning',
    items: [
      { id: 'item-10', type: 'other', title: 'Pre-Service Prayer', duration: 900, assignee: 'Worship Team', order: 0 },
      { id: 'item-11', type: 'song', title: 'Good Good Father', duration: 300, songId: 'song-1', arrangementId: 'arr-1', selectedKey: 'G', order: 1 },
      { id: 'item-12', type: 'song', title: 'Way Maker', duration: 360, songId: 'song-2', arrangementId: 'arr-3', selectedKey: 'E', order: 2 },
      { id: 'item-13', type: 'song', title: 'Build My Life', duration: 330, songId: 'song-3', arrangementId: 'arr-5', selectedKey: 'E', order: 3 },
      { id: 'item-14', type: 'announcement', title: 'Announcements', duration: 300, assignee: 'Sarah Mitchell', order: 4 },
      { id: 'item-15', type: 'offering', title: 'Offering', duration: 240, order: 5 },
      { id: 'item-16', type: 'message', title: 'Hope for the Holidays', duration: 2100, assignee: 'Pastor John', order: 6, notes: 'Series: Advent Week 3' },
      { id: 'item-17', type: 'song', title: 'King of Kings', duration: 290, songId: 'song-4', arrangementId: 'arr-6', selectedKey: 'D', order: 7 },
      { id: 'item-18', type: 'prayer', title: 'Closing Prayer', duration: 180, assignee: 'Pastor John', order: 8 },
    ],
    volunteers: [
      { id: 'vol-9', personId: 'person-1', personName: 'Michael Chen', role: 'Worship Leader', status: 'confirmed' },
      { id: 'vol-10', personId: 'person-9', personName: 'Amanda Foster', role: 'Vocals', status: 'confirmed' },
      { id: 'vol-11', personId: 'person-10', personName: 'Chris Taylor', role: 'Electric Guitar', status: 'confirmed' },
      { id: 'vol-12', personId: 'person-4', personName: 'Rachel Green', role: 'Keys', status: 'confirmed' },
      { id: 'vol-13', personId: 'person-11', personName: 'Mark Johnson', role: 'Drums', status: 'pending' },
    ],
    notes: 'Third Sunday of Advent - Joy theme',
  },
  {
    id: 'service-3',
    name: 'Sunday Morning',
    date: '2024-12-22',
    time: '9:00 AM',
    isLinked: true,
    status: 'draft',
    items: [
      { id: 'item-19', type: 'other', title: 'Pre-Service Prayer', duration: 900, order: 0 },
      { id: 'item-20', type: 'song', title: 'O Come All Ye Faithful', duration: 240, songId: 'song-6', arrangementId: 'arr-9', selectedKey: 'G', order: 1 },
    ],
    volunteers: [],
    notes: 'Fourth Sunday of Advent - Love theme',
  },
];

export const mockTemplates: ServiceTemplate[] = [
  {
    id: 'template-1',
    name: 'Standard Sunday',
    description: 'Regular Sunday morning service format',
    items: [
      { type: 'other', title: 'Pre-Service Prayer', duration: 900, order: 0 },
      { type: 'song', title: 'Opening Song', duration: 300, order: 1 },
      { type: 'song', title: 'Worship Song 2', duration: 300, order: 2 },
      { type: 'song', title: 'Worship Song 3', duration: 300, order: 3 },
      { type: 'announcement', title: 'Announcements', duration: 300, order: 4 },
      { type: 'offering', title: 'Offering', duration: 240, order: 5 },
      { type: 'message', title: 'Message', duration: 2100, order: 6 },
      { type: 'song', title: 'Closing Song', duration: 300, order: 7 },
      { type: 'prayer', title: 'Closing Prayer', duration: 180, order: 8 },
    ],
  },
  {
    id: 'template-2',
    name: 'Worship Night',
    description: 'Extended worship evening format',
    items: [
      { type: 'song', title: 'Opening Set', duration: 900, order: 0 },
      { type: 'prayer', title: 'Prayer Time', duration: 600, order: 1 },
      { type: 'song', title: 'Worship Set', duration: 1800, order: 2 },
      { type: 'message', title: 'Short Message', duration: 900, order: 3 },
      { type: 'song', title: 'Response', duration: 600, order: 4 },
    ],
  },
];

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
