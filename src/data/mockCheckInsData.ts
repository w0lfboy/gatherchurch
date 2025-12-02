import { 
  CheckInStation, Room, CheckInSession, CheckedInPerson, 
  LabelTemplate, AttendanceRecord, SupportedDevice, SupportedPrinter
} from '@/types/checkins';

export const mockRooms: Room[] = [
  { id: 'r1', name: 'Nursery', capacity: 12, ageRange: '0-1 years', department: 'Kids Ministry', currentCount: 8, ratio: '1:3' },
  { id: 'r2', name: 'Toddlers', capacity: 15, ageRange: '2-3 years', department: 'Kids Ministry', currentCount: 11, ratio: '1:4' },
  { id: 'r3', name: 'Preschool', capacity: 20, ageRange: '4-5 years', department: 'Kids Ministry', currentCount: 16, ratio: '1:5' },
  { id: 'r4', name: 'Elementary 1-2', capacity: 25, ageRange: 'Grades 1-2', department: 'Kids Ministry', currentCount: 19, ratio: '1:8' },
  { id: 'r5', name: 'Elementary 3-5', capacity: 25, ageRange: 'Grades 3-5', department: 'Kids Ministry', currentCount: 22, ratio: '1:8' },
  { id: 'r6', name: 'Youth Room', capacity: 50, ageRange: 'Grades 6-12', department: 'Youth Ministry', currentCount: 28, ratio: '1:10' },
  { id: 'r7', name: 'Sanctuary', capacity: 300, department: 'Main Service', currentCount: 185 },
];

export const mockStations: CheckInStation[] = [
  { 
    id: 'st1', name: 'Main Lobby Kiosk', location: 'Front Lobby', 
    mode: 'self_service', deviceType: 'ipad', isOnline: true,
    printer: { id: 'p1', name: 'Lobby Zebra', type: 'zebra', connectionType: 'wifi', status: 'connected', labelTemplateId: 'lt1' },
    serviceIds: ['s1', 's2'], enabledRooms: ['r1', 'r2', 'r3', 'r4', 'r5'],
    lastActivity: '2024-12-08T09:15:00'
  },
  { 
    id: 'st2', name: 'Kids Wing Station', location: 'Kids Wing Entrance', 
    mode: 'leader_assisted', deviceType: 'chromebook', isOnline: true,
    printer: { id: 'p2', name: 'Kids Brother', type: 'brother', connectionType: 'bluetooth', status: 'connected', labelTemplateId: 'lt1' },
    serviceIds: ['s1', 's2'], enabledRooms: ['r1', 'r2', 'r3', 'r4', 'r5'],
    lastActivity: '2024-12-08T09:18:00'
  },
  { 
    id: 'st3', name: 'Youth Check-In', location: 'Youth Center', 
    mode: 'express', deviceType: 'android_tablet', isOnline: true,
    serviceIds: ['s1', 's2'], enabledRooms: ['r6'],
    lastActivity: '2024-12-08T09:10:00'
  },
  { 
    id: 'st4', name: 'Backup Station', location: 'Office', 
    mode: 'leader_assisted', deviceType: 'pc', isOnline: false,
    serviceIds: ['s1', 's2'], enabledRooms: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'],
  },
];

export const mockSessions: CheckInSession[] = [
  { id: 'ses1', serviceId: 's1', serviceName: 'Sunday 9:00 AM', serviceTime: '9:00 AM', date: '2024-12-08', status: 'active', totalCheckedIn: 76, totalCheckedOut: 2 },
  { id: 'ses2', serviceId: 's2', serviceName: 'Sunday 11:00 AM', serviceTime: '11:00 AM', date: '2024-12-08', status: 'upcoming', totalCheckedIn: 0, totalCheckedOut: 0 },
];

export const mockCheckedIn: CheckedInPerson[] = [
  {
    id: 'ci1', personId: 'p3', firstName: 'Emma', lastName: 'Mitchell',
    type: 'child', roomId: 'r4', roomName: 'Elementary 1-2', sessionId: 'ses1',
    checkedInAt: '2024-12-08T08:45:00', checkedInBy: 'Sarah Mitchell',
    pickupCode: 'ABC-1234',
    guardians: [
      { id: 'g1', name: 'Sarah Mitchell', phone: '(555) 123-4567', relationship: 'parent', canPickup: true },
      { id: 'g2', name: 'David Mitchell', phone: '(555) 123-4568', relationship: 'parent', canPickup: true },
    ],
    medicalAlerts: [],
    allergies: [],
    labelPrinted: true, parentLabelPrinted: true,
  },
  {
    id: 'ci2', personId: 'child2', firstName: 'Lily', lastName: 'Thompson',
    type: 'child', roomId: 'r2', roomName: 'Toddlers', sessionId: 'ses1',
    checkedInAt: '2024-12-08T08:50:00',
    pickupCode: 'DEF-5678',
    guardians: [
      { id: 'g3', name: 'Marcus Thompson', phone: '(555) 234-5678', relationship: 'parent', canPickup: true },
    ],
    medicalAlerts: [
      { id: 'ma1', type: 'allergy', severity: 'high', description: 'Peanut allergy', instructions: 'EpiPen in diaper bag' }
    ],
    allergies: ['Peanuts'],
    specialNotes: 'Shy with new people, allow time to warm up',
    labelPrinted: true, parentLabelPrinted: true,
  },
  {
    id: 'ci3', personId: 'child3', firstName: 'Noah', lastName: 'Chen',
    type: 'child', roomId: 'r3', roomName: 'Preschool', sessionId: 'ses1',
    checkedInAt: '2024-12-08T08:55:00',
    pickupCode: 'GHI-9012',
    guardians: [
      { id: 'g4', name: 'Robert Chen', phone: '(555) 678-9012', relationship: 'parent', canPickup: true },
      { id: 'g5', name: 'Linda Chen', phone: '(555) 678-9013', relationship: 'parent', canPickup: true },
    ],
    medicalAlerts: [
      { id: 'ma2', type: 'medical', severity: 'medium', description: 'Asthma', instructions: 'Inhaler in backpack if needed' }
    ],
    allergies: [],
    labelPrinted: true, parentLabelPrinted: true,
  },
  {
    id: 'ci4', personId: 'child4', firstName: 'Sophia', lastName: 'Garcia',
    type: 'child', roomId: 'r1', roomName: 'Nursery', sessionId: 'ses1',
    checkedInAt: '2024-12-08T09:00:00',
    pickupCode: 'JKL-3456',
    guardians: [
      { id: 'g6', name: 'Maria Garcia', phone: '(555) 567-8901', relationship: 'parent', canPickup: true },
    ],
    medicalAlerts: [],
    allergies: ['Dairy'],
    labelPrinted: true, parentLabelPrinted: true,
  },
  {
    id: 'ci5', personId: 'vol1', firstName: 'Jennifer', lastName: 'Lee',
    type: 'volunteer', roomId: 'r3', roomName: 'Preschool', sessionId: 'ses1',
    checkedInAt: '2024-12-08T08:30:00',
    pickupCode: '',
    guardians: [],
    medicalAlerts: [],
    allergies: [],
    labelPrinted: true, parentLabelPrinted: false,
  },
];

export const mockLabelTemplates: LabelTemplate[] = [
  {
    id: 'lt1', name: 'Standard Child Label', type: 'child', width: 62, height: 29, isDefault: true,
    elements: [
      { id: 'e1', type: 'text', x: 5, y: 5, width: 52, height: 10, content: '{{firstName}} {{lastName}}', fontSize: 14, fontWeight: 'bold' },
      { id: 'e2', type: 'text', x: 5, y: 16, width: 30, height: 8, content: '{{roomName}}', fontSize: 10 },
      { id: 'e3', type: 'barcode', x: 40, y: 15, width: 20, height: 12, content: '{{pickupCode}}' },
    ],
  },
  {
    id: 'lt2', name: 'Parent Pickup Label', type: 'parent', width: 62, height: 29, isDefault: false,
    elements: [
      { id: 'e4', type: 'text', x: 5, y: 5, width: 52, height: 10, content: 'PARENT PICKUP', fontSize: 12, fontWeight: 'bold' },
      { id: 'e5', type: 'text', x: 5, y: 16, width: 30, height: 8, content: '{{firstName}} {{lastName}}', fontSize: 10 },
      { id: 'e6', type: 'barcode', x: 40, y: 15, width: 20, height: 12, content: '{{pickupCode}}' },
    ],
  },
];

export const mockAttendance: AttendanceRecord[] = [
  { date: '2024-12-08', serviceId: 's1', serviceName: '9:00 AM', roomId: 'r1', roomName: 'Nursery', totalCheckedIn: 8, totalCheckedOut: 0, avgDuration: 0, newVisitors: 1, regularAttendees: 7 },
  { date: '2024-12-08', serviceId: 's1', serviceName: '9:00 AM', roomId: 'r2', roomName: 'Toddlers', totalCheckedIn: 11, totalCheckedOut: 0, avgDuration: 0, newVisitors: 2, regularAttendees: 9 },
  { date: '2024-12-08', serviceId: 's1', serviceName: '9:00 AM', roomId: 'r3', roomName: 'Preschool', totalCheckedIn: 16, totalCheckedOut: 0, avgDuration: 0, newVisitors: 1, regularAttendees: 15 },
  { date: '2024-12-01', serviceId: 's1', serviceName: '9:00 AM', roomId: 'r1', roomName: 'Nursery', totalCheckedIn: 10, totalCheckedOut: 10, avgDuration: 75, newVisitors: 2, regularAttendees: 8 },
  { date: '2024-12-01', serviceId: 's1', serviceName: '9:00 AM', roomId: 'r2', roomName: 'Toddlers', totalCheckedIn: 13, totalCheckedOut: 13, avgDuration: 72, newVisitors: 1, regularAttendees: 12 },
];

export const supportedDevices: SupportedDevice[] = [
  { type: 'ipad', name: 'iPad', requirements: 'iOS 14+, Safari', features: ['Touch optimized', 'Camera for QR scan', 'Bluetooth printing', 'Best experience'] },
  { type: 'android_tablet', name: 'Android Tablet', requirements: 'Android 10+, Chrome', features: ['Touch optimized', 'Camera for QR scan', 'Multiple printer support'] },
  { type: 'chromebook', name: 'Chromebook', requirements: 'Chrome OS, Chrome browser', features: ['Keyboard support', 'USB printing', 'Cost effective'] },
  { type: 'pc', name: 'Windows/Mac PC', requirements: 'Modern browser', features: ['Full keyboard', 'USB/Network printing', 'Backup option'] },
  { type: 'kiosk', name: 'Dedicated Kiosk', requirements: 'Any touch device', features: ['Locked mode', 'Custom branding', 'Standalone operation'] },
];

export const supportedPrinters: SupportedPrinter[] = [
  { type: 'zebra', models: ['ZD410', 'ZD420', 'ZD620', 'GK420d'], connectionTypes: ['USB', 'Bluetooth', 'WiFi', 'Ethernet'], labelSizes: ['2"x1"', '2.25"x1.25"', '4"x2"'] },
  { type: 'brother', models: ['QL-810W', 'QL-820NWB', 'QL-1110NWB'], connectionTypes: ['USB', 'Bluetooth', 'WiFi'], labelSizes: ['62mm', '102mm'] },
  { type: 'dymo', models: ['LabelWriter 450', 'LabelWriter 550'], connectionTypes: ['USB'], labelSizes: ['30256', '30258', '30336'] },
  { type: 'epson', models: ['LW-PX400', 'LW-Z5000'], connectionTypes: ['USB', 'Bluetooth'], labelSizes: ['12mm', '18mm', '24mm'] },
];

export const generatePickupCode = () => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const numbers = '0123456789';
  let code = '';
  for (let i = 0; i < 3; i++) code += letters[Math.floor(Math.random() * letters.length)];
  code += '-';
  for (let i = 0; i < 4; i++) code += numbers[Math.floor(Math.random() * numbers.length)];
  return code;
};

export const getRoomById = (id: string) => mockRooms.find(r => r.id === id);
export const getCheckedInByRoom = (roomId: string) => mockCheckedIn.filter(c => c.roomId === roomId);
export const getCheckedInBySession = (sessionId: string) => mockCheckedIn.filter(c => c.sessionId === sessionId);
