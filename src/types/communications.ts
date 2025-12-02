// Core data types for the Communications module

export type MessageChannel = 'email' | 'sms' | 'push' | 'in_app';
export type MessageStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed' | 'delivered';
export type MessageDirection = 'inbound' | 'outbound';
export type AudienceType = 'all' | 'volunteers' | 'group' | 'family' | 'age_bracket' | 'tag' | 'custom';
export type AnnouncementPriority = 'low' | 'normal' | 'high' | 'urgent';
export type TemplateCategory = 'welcome' | 'event' | 'reminder' | 'newsletter' | 'follow_up' | 'custom';

export interface Message {
  id: string;
  subject?: string;
  content: string;
  htmlContent?: string;
  channel: MessageChannel;
  status: MessageStatus;
  direction: MessageDirection;
  
  // Sender
  senderId?: string;
  senderName: string;
  senderEmail?: string;
  
  // Recipients
  recipientId?: string;
  recipientName?: string;
  recipientEmail?: string;
  recipientPhone?: string;
  recipientCount: number;
  
  // Audience targeting
  audienceType?: AudienceType;
  audienceFilters?: AudienceFilter[];
  
  // Tracking
  openCount?: number;
  clickCount?: number;
  bounceCount?: number;
  unsubscribeCount?: number;
  
  // Scheduling
  scheduledFor?: string;
  sentAt?: string;
  
  // Links
  linkedPersonId?: string;
  linkedGroupId?: string;
  linkedEventId?: string;
  
  // Threading
  threadId?: string;
  parentMessageId?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface AudienceFilter {
  field: string;
  operator: 'equals' | 'contains' | 'in' | 'not_in' | 'greater_than' | 'less_than';
  value: string | string[] | number;
}

export interface MessageThread {
  id: string;
  subject?: string;
  participants: ThreadParticipant[];
  lastMessageAt: string;
  messageCount: number;
  unreadCount: number;
  isArchived: boolean;
  labels: string[];
}

export interface ThreadParticipant {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  isExternal: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  htmlContent?: string;
  priority: AnnouncementPriority;
  
  // Display
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  
  // Visibility
  isPublished: boolean;
  isPinned: boolean;
  publishedAt?: string;
  expiresAt?: string;
  
  // Targeting
  audienceType: AudienceType;
  audienceFilters?: AudienceFilter[];
  
  // Author
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  
  // Engagement
  viewCount: number;
  likeCount: number;
  commentCount: number;
  
  createdAt: string;
  updatedAt: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  
  // Content
  subject?: string;
  content: string;
  htmlContent?: string;
  
  // Channels
  supportedChannels: MessageChannel[];
  
  // Variables
  variables: TemplateVariable[];
  
  // Usage
  useCount: number;
  lastUsedAt?: string;
  
  // Meta
  isSystem: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateVariable {
  name: string;
  defaultValue?: string;
  description?: string;
  required: boolean;
}

export interface Notification {
  id: string;
  type: 'message' | 'announcement' | 'reminder' | 'system';
  title: string;
  body: string;
  
  // Targeting
  recipientId: string;
  
  // Status
  isRead: boolean;
  readAt?: string;
  
  // Action
  actionUrl?: string;
  actionText?: string;
  
  // Source
  sourceType?: string;
  sourceId?: string;
  
  createdAt: string;
}

export interface AutomatedReminder {
  id: string;
  name: string;
  description?: string;
  
  // Trigger
  triggerType: 'event' | 'schedule' | 'date_field';
  triggerValue: string;
  offsetMinutes: number;
  offsetDirection: 'before' | 'after';
  
  // Message
  templateId?: string;
  channel: MessageChannel;
  subject?: string;
  content: string;
  
  // Targeting
  audienceType: AudienceType;
  audienceFilters?: AudienceFilter[];
  
  // Status
  isActive: boolean;
  lastTriggeredAt?: string;
  triggerCount: number;
  
  createdAt: string;
}

export interface TeamChat {
  id: string;
  name: string;
  description?: string;
  members: ChatMember[];
  isPrivate: boolean;
  lastMessageAt?: string;
  unreadCount: number;
  createdAt: string;
}

export interface ChatMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member';
  joinedAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  attachments?: ChatAttachment[];
  reactions?: { emoji: string; count: number }[];
  isEdited: boolean;
  createdAt: string;
}

export interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

// Analytics
export interface MessageAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  openRate: number;
  clickRate: number;
  byChannel: Record<MessageChannel, number>;
  byDay: { date: string; count: number }[];
}
