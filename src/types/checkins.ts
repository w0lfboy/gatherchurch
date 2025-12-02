// Core data types for the Check-Ins module

export type CheckInType = 'child' | 'adult' | 'volunteer';
export type StationMode = 'self_service' | 'leader_assisted' | 'express';
export type DeviceType = 'ipad' | 'android_tablet' | 'chromebook' | 'pc' | 'kiosk';
export type PrinterType = 'zebra' | 'brother' | 'dymo' | 'epson' | 'none';

export interface CheckInStation {
  id: string;
  name: string;
  location: string;
  mode: StationMode;
  deviceType: DeviceType;
  printer?: PrinterConfig;
  isOnline: boolean;
  lastActivity?: string;
  serviceIds: string[]; // Which services this station is for
  enabledRooms: string[];
}

export interface PrinterConfig {
  id: string;
  name: string;
  type: PrinterType;
  connectionType: 'usb' | 'bluetooth' | 'wifi' | 'network';
  ipAddress?: string;
  status: 'connected' | 'disconnected' | 'error';
  labelTemplateId: string;
}

export interface Room {
  id: string;
  name: string;
  capacity?: number;
  ageRange?: string;
  department: string;
  currentCount: number;
  ratio?: string; // e.g., "1:5" for volunteer to child ratio
}

export interface CheckInSession {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceTime: string;
  date: string;
  status: 'upcoming' | 'active' | 'completed';
  totalCheckedIn: number;
  totalCheckedOut: number;
}

export interface CheckedInPerson {
  id: string;
  personId: string;
  firstName: string;
  lastName: string;
  type: CheckInType;
  roomId: string;
  roomName: string;
  sessionId: string;
  
  // Check-in details
  checkedInAt: string;
  checkedInBy?: string;
  checkedOutAt?: string;
  checkedOutBy?: string;
  stationId?: string;
  
  // Security
  pickupCode: string;
  guardians: Guardian[];
  
  // Medical/Safety
  medicalAlerts: MedicalAlert[];
  allergies: string[];
  specialNotes?: string;
  
  // Labels
  labelPrinted: boolean;
  parentLabelPrinted: boolean;
}

export interface Guardian {
  id: string;
  name: string;
  phone: string;
  relationship: 'parent' | 'guardian' | 'grandparent' | 'authorized';
  canPickup: boolean;
}

export interface MedicalAlert {
  id: string;
  type: 'allergy' | 'medical' | 'behavioral' | 'dietary';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  instructions?: string;
}

export interface LabelTemplate {
  id: string;
  name: string;
  type: 'child' | 'parent' | 'volunteer' | 'name_tag';
  width: number; // mm
  height: number; // mm
  elements: LabelElement[];
  isDefault: boolean;
}

export interface LabelElement {
  id: string;
  type: 'text' | 'barcode' | 'qr_code' | 'image' | 'line';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string; // Static text or field name like {{firstName}}
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  alignment?: 'left' | 'center' | 'right';
}

export interface AttendanceRecord {
  date: string;
  serviceId: string;
  serviceName: string;
  roomId: string;
  roomName: string;
  totalCheckedIn: number;
  totalCheckedOut: number;
  avgDuration: number; // minutes
  newVisitors: number;
  regularAttendees: number;
}

export interface ParentNotification {
  id: string;
  checkedInPersonId: string;
  guardianPhone: string;
  message: string;
  sentAt: string;
  sentBy: string;
  reason: 'pickup_needed' | 'medical' | 'behavior' | 'general';
}

// Security
export interface BackgroundCheckStatus {
  personId: string;
  status: 'none' | 'pending' | 'approved' | 'expired' | 'denied';
  checkedDate?: string;
  expiresDate?: string;
  provider?: string;
}

// Hardware compatibility
export interface SupportedDevice {
  type: DeviceType;
  name: string;
  requirements: string;
  features: string[];
}

export interface SupportedPrinter {
  type: PrinterType;
  models: string[];
  connectionTypes: string[];
  labelSizes: string[];
}
