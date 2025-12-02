import { 
  Team, TeamRole, VolunteerProfile, BlackoutDate, 
  ScheduledShift, SwapRequest, Notification 
} from '@/types/volunteers';

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'Worship Team',
    category: 'worship',
    description: 'Lead the congregation in musical worship',
    leaderId: '1',
    leaderName: 'Sarah Mitchell',
    memberCount: 18,
    color: 'sage',
  },
  {
    id: 't2',
    name: 'Kids Ministry',
    category: 'kids',
    description: 'Nurture and teach children ages 0-12',
    leaderId: '5',
    leaderName: 'Jennifer Lee',
    memberCount: 24,
    color: 'coral',
  },
  {
    id: 't3',
    name: 'Hospitality',
    category: 'hospitality',
    description: 'Welcome guests and create a warm environment',
    leaderId: '4',
    leaderName: 'Marcus Thompson',
    memberCount: 15,
    color: 'gold',
  },
  {
    id: 't4',
    name: 'Tech Team',
    category: 'tech',
    description: 'Sound, lights, and media production',
    leaderId: '2',
    leaderName: 'David Mitchell',
    memberCount: 8,
    color: 'sage',
  },
  {
    id: 't5',
    name: 'Prayer Team',
    category: 'admin',
    description: 'Pray for and with congregation members',
    leaderId: '5',
    leaderName: 'Jennifer Lee',
    memberCount: 12,
    color: 'coral',
  },
];

export const mockRoles: TeamRole[] = [
  // Worship Team Roles
  { id: 'r1', teamId: 't1', name: 'Worship Leader', description: 'Lead vocals and direct the team', minVolunteers: 1, maxVolunteers: 1, requiresBackgroundCheck: false, skills: ['vocals', 'leadership'] },
  { id: 'r2', teamId: 't1', name: 'Vocalist', description: 'Backup vocals', minVolunteers: 2, maxVolunteers: 4, requiresBackgroundCheck: false, skills: ['vocals'] },
  { id: 'r3', teamId: 't1', name: 'Guitarist', description: 'Acoustic or electric guitar', minVolunteers: 1, maxVolunteers: 2, requiresBackgroundCheck: false, skills: ['guitar'] },
  { id: 'r4', teamId: 't1', name: 'Drummer', description: 'Drums and percussion', minVolunteers: 1, maxVolunteers: 1, requiresBackgroundCheck: false, skills: ['drums'] },
  { id: 'r5', teamId: 't1', name: 'Keys', description: 'Piano or keyboard', minVolunteers: 1, maxVolunteers: 1, requiresBackgroundCheck: false, skills: ['keys'] },
  // Kids Ministry Roles
  { id: 'r6', teamId: 't2', name: 'Lead Teacher', description: 'Teach the main lesson', minVolunteers: 1, maxVolunteers: 2, requiresBackgroundCheck: true, skills: ['teaching', 'kids'] },
  { id: 'r7', teamId: 't2', name: 'Room Helper', description: 'Assist with activities', minVolunteers: 2, maxVolunteers: 4, requiresBackgroundCheck: true, skills: ['kids'] },
  { id: 'r8', teamId: 't2', name: 'Check-in', description: 'Manage child check-in', minVolunteers: 1, maxVolunteers: 2, requiresBackgroundCheck: true, skills: ['admin'] },
  // Hospitality Roles
  { id: 'r9', teamId: 't3', name: 'Greeter', description: 'Welcome guests at the door', minVolunteers: 2, maxVolunteers: 4, requiresBackgroundCheck: false, skills: ['hospitality'] },
  { id: 'r10', teamId: 't3', name: 'Usher', description: 'Help with seating and offerings', minVolunteers: 2, maxVolunteers: 4, requiresBackgroundCheck: false, skills: ['hospitality'] },
  { id: 'r11', teamId: 't3', name: 'Coffee Bar', description: 'Serve coffee and refreshments', minVolunteers: 2, maxVolunteers: 3, requiresBackgroundCheck: false, skills: ['hospitality'] },
  // Tech Roles
  { id: 'r12', teamId: 't4', name: 'Sound Engineer', description: 'Operate the soundboard', minVolunteers: 1, maxVolunteers: 1, requiresBackgroundCheck: false, skills: ['audio'] },
  { id: 'r13', teamId: 't4', name: 'Lights', description: 'Operate lighting', minVolunteers: 1, maxVolunteers: 1, requiresBackgroundCheck: false, skills: ['lighting'] },
  { id: 'r14', teamId: 't4', name: 'ProPresenter', description: 'Run slides and lyrics', minVolunteers: 1, maxVolunteers: 1, requiresBackgroundCheck: false, skills: ['media'] },
  { id: 'r15', teamId: 't4', name: 'Camera', description: 'Operate live stream camera', minVolunteers: 1, maxVolunteers: 2, requiresBackgroundCheck: false, skills: ['video'] },
];

export const mockVolunteers: VolunteerProfile[] = [
  {
    id: 'v1',
    personId: '1',
    personName: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '(555) 123-4567',
    teams: ['t1'],
    roles: ['r1', 'r2'],
    skills: ['vocals', 'leadership', 'guitar'],
    preferredServiceTime: '9am',
    maxServicesPerMonth: 3,
    servicesThisMonth: 2,
    status: 'active',
    familyMembers: ['2', '3'],
    joinedDate: '2019-06-01',
    lastServed: '2024-11-24',
  },
  {
    id: 'v2',
    personId: '2',
    personName: 'David Mitchell',
    email: 'david.mitchell@email.com',
    phone: '(555) 123-4568',
    teams: ['t4'],
    roles: ['r12'],
    skills: ['audio', 'tech'],
    preferredServiceTime: '9am',
    maxServicesPerMonth: 4,
    servicesThisMonth: 3,
    status: 'active',
    familyMembers: ['1', '3'],
    joinedDate: '2019-06-01',
    lastServed: '2024-12-01',
  },
  {
    id: 'v3',
    personId: '4',
    personName: 'Marcus Thompson',
    email: 'marcus.t@email.com',
    phone: '(555) 234-5678',
    teams: ['t1', 't3'],
    roles: ['r2', 'r9'],
    skills: ['vocals', 'hospitality'],
    preferredServiceTime: 'either',
    maxServicesPerMonth: 4,
    servicesThisMonth: 2,
    status: 'active',
    joinedDate: '2020-02-15',
    lastServed: '2024-11-24',
  },
  {
    id: 'v4',
    personId: '5',
    personName: 'Jennifer Lee',
    email: 'jennifer.lee@email.com',
    phone: '(555) 345-6789',
    teams: ['t2', 't5'],
    roles: ['r6', 'r8'],
    skills: ['teaching', 'kids', 'leadership'],
    preferredServiceTime: '11am',
    maxServicesPerMonth: 3,
    servicesThisMonth: 3,
    status: 'active',
    joinedDate: '2015-03-01',
    lastServed: '2024-12-01',
  },
  {
    id: 'v5',
    personId: '8',
    personName: 'Robert Chen',
    email: 'robert.chen@email.com',
    phone: '(555) 678-9012',
    teams: ['t4'],
    roles: ['r14', 'r15'],
    skills: ['media', 'video', 'tech'],
    preferredServiceTime: 'either',
    maxServicesPerMonth: 4,
    servicesThisMonth: 1,
    status: 'active',
    joinedDate: '2018-01-01',
    lastServed: '2024-11-17',
  },
];

export const mockBlackoutDates: BlackoutDate[] = [
  {
    id: 'b1',
    volunteerId: 'v1',
    startDate: '2024-12-22',
    endDate: '2024-12-29',
    reason: 'Family vacation',
    isRecurring: false,
  },
  {
    id: 'b2',
    volunteerId: 'v3',
    startDate: '2024-12-15',
    endDate: '2024-12-15',
    reason: 'Work commitment',
    isRecurring: false,
  },
];

export const mockScheduledShifts: ScheduledShift[] = [
  // Dec 8 - 9am
  { id: 'sh1', serviceId: '1', serviceDate: '2024-12-08', serviceTime: '9:00 AM', teamId: 't1', roleId: 'r1', volunteerId: 'v1', volunteerName: 'Sarah Mitchell', status: 'confirmed', confirmedAt: '2024-11-25', reminderSent: true, lastReminderAt: '2024-12-05' },
  { id: 'sh2', serviceId: '1', serviceDate: '2024-12-08', serviceTime: '9:00 AM', teamId: 't1', roleId: 'r2', volunteerId: 'v3', volunteerName: 'Marcus Thompson', status: 'confirmed', confirmedAt: '2024-11-26', reminderSent: true, lastReminderAt: '2024-12-05' },
  { id: 'sh3', serviceId: '1', serviceDate: '2024-12-08', serviceTime: '9:00 AM', teamId: 't4', roleId: 'r12', volunteerId: 'v2', volunteerName: 'David Mitchell', status: 'confirmed', confirmedAt: '2024-11-25', reminderSent: true, lastReminderAt: '2024-12-05' },
  { id: 'sh4', serviceId: '1', serviceDate: '2024-12-08', serviceTime: '9:00 AM', teamId: 't2', roleId: 'r6', volunteerId: 'v4', volunteerName: 'Jennifer Lee', status: 'pending', reminderSent: true, lastReminderAt: '2024-12-01' },
  // Dec 8 - 11am
  { id: 'sh5', serviceId: '2', serviceDate: '2024-12-08', serviceTime: '11:00 AM', teamId: 't4', roleId: 'r14', volunteerId: 'v5', volunteerName: 'Robert Chen', status: 'swap-requested', reminderSent: false },
  // Dec 15 - 9am
  { id: 'sh6', serviceId: '3', serviceDate: '2024-12-15', serviceTime: '9:00 AM', teamId: 't1', roleId: 'r1', volunteerId: 'v1', volunteerName: 'Sarah Mitchell', status: 'pending', reminderSent: false },
  { id: 'sh7', serviceId: '3', serviceDate: '2024-12-15', serviceTime: '9:00 AM', teamId: 't3', roleId: 'r9', volunteerId: 'v3', volunteerName: 'Marcus Thompson', status: 'declined', declinedAt: '2024-12-02', declineReason: 'Work commitment', reminderSent: false },
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: 'swap1',
    shiftId: 'sh5',
    requesterId: 'v5',
    requesterName: 'Robert Chen',
    requestType: 'sub',
    status: 'open',
    reason: 'Family emergency',
    suggestedReplacements: [
      { volunteerId: 'v2', volunteerName: 'David Mitchell', matchScore: 85, reasons: ['Same skills', 'Available', 'Low monthly count'], isAvailable: true, lastServed: '2024-12-01', servicesThisMonth: 3 },
    ],
    createdAt: '2024-12-02T10:30:00Z',
    updatedAt: '2024-12-02T10:30:00Z',
  },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', volunteerId: 'v1', type: 'schedule', title: 'New Schedule Posted', message: 'You\'ve been scheduled for Worship Leader on Dec 8 at 9am', read: false, actionUrl: '/volunteers/schedule', createdAt: '2024-11-25T08:00:00Z' },
  { id: 'n2', volunteerId: 'v4', type: 'reminder', title: 'Service Reminder', message: 'You\'re serving this Sunday, Dec 8 as Lead Teacher', read: false, actionUrl: '/volunteers/schedule', createdAt: '2024-12-05T09:00:00Z' },
  { id: 'n3', volunteerId: 'v2', type: 'swap-request', title: 'Sub Request', message: 'Robert Chen needs a sub for Dec 8 - ProPresenter', read: false, actionUrl: '/volunteers/swaps', createdAt: '2024-12-02T10:30:00Z' },
];

export const getTeamById = (id: string) => mockTeams.find(t => t.id === id);
export const getRoleById = (id: string) => mockRoles.find(r => r.id === id);
export const getVolunteerById = (id: string) => mockVolunteers.find(v => v.id === id);
export const getRolesByTeam = (teamId: string) => mockRoles.filter(r => r.teamId === teamId);
export const getShiftsByDate = (date: string) => mockScheduledShifts.filter(s => s.serviceDate === date);
export const getShiftsByVolunteer = (volunteerId: string) => mockScheduledShifts.filter(s => s.volunteerId === volunteerId);
