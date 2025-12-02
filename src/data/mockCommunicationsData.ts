import {
  Message,
  MessageThread,
  Announcement,
  MessageTemplate,
  Notification,
  AutomatedReminder,
  TeamChat,
  ChatMessage,
  MessageAnalytics
} from '@/types/communications';

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    subject: 'Welcome to Grace Community Church!',
    content: 'Thank you for visiting us this Sunday. We hope you felt welcomed and would love to see you again!',
    channel: 'email',
    status: 'delivered',
    direction: 'outbound',
    senderName: 'Pastor Michael Chen',
    senderEmail: 'pastor@gracechurch.org',
    recipientName: 'Sarah Johnson',
    recipientEmail: 'sarah@email.com',
    recipientCount: 1,
    openCount: 1,
    clickCount: 0,
    sentAt: '2024-01-20T10:30:00Z',
    linkedPersonId: 'p-1',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:30:00Z'
  },
  {
    id: 'msg-2',
    subject: 'Volunteer Schedule Reminder',
    content: 'This is a reminder that you are scheduled to serve this Sunday at 9:00 AM in the Kids Ministry.',
    channel: 'sms',
    status: 'delivered',
    direction: 'outbound',
    senderName: 'ChurchOS',
    recipientName: 'David Kim',
    recipientPhone: '+1234567890',
    recipientCount: 1,
    sentAt: '2024-01-19T08:00:00Z',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-19T08:00:00Z'
  },
  {
    id: 'msg-3',
    subject: 'Question about Small Groups',
    content: 'Hi, I\'m interested in joining a small group. Can you tell me more about what groups are available?',
    channel: 'email',
    status: 'delivered',
    direction: 'inbound',
    senderName: 'Emily Davis',
    senderEmail: 'emily@email.com',
    recipientName: 'Church Office',
    recipientCount: 1,
    linkedPersonId: 'p-2',
    threadId: 'thread-1',
    createdAt: '2024-01-18T14:30:00Z',
    updatedAt: '2024-01-18T14:30:00Z'
  },
  {
    id: 'msg-4',
    subject: 'Re: Question about Small Groups',
    content: 'Hi Emily! We\'d love to help you find a group. We have several options...',
    channel: 'email',
    status: 'delivered',
    direction: 'outbound',
    senderName: 'Jennifer Martinez',
    senderEmail: 'groups@gracechurch.org',
    recipientName: 'Emily Davis',
    recipientEmail: 'emily@email.com',
    recipientCount: 1,
    openCount: 1,
    sentAt: '2024-01-18T16:00:00Z',
    linkedPersonId: 'p-2',
    threadId: 'thread-1',
    parentMessageId: 'msg-3',
    createdAt: '2024-01-18T15:45:00Z',
    updatedAt: '2024-01-18T16:00:00Z'
  },
  {
    id: 'msg-5',
    subject: 'Weekly Newsletter - January 21',
    content: 'This week at Grace: Upcoming events, prayer requests, and more...',
    htmlContent: '<h1>This Week at Grace</h1><p>Upcoming events, prayer requests, and more...</p>',
    channel: 'email',
    status: 'delivered',
    direction: 'outbound',
    senderName: 'Grace Community Church',
    senderEmail: 'newsletter@gracechurch.org',
    recipientCount: 450,
    audienceType: 'all',
    openCount: 312,
    clickCount: 89,
    sentAt: '2024-01-21T08:00:00Z',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-21T08:00:00Z'
  }
];

export const mockThreads: MessageThread[] = [
  {
    id: 'thread-1',
    subject: 'Question about Small Groups',
    participants: [
      { id: 'p-2', name: 'Emily Davis', email: 'emily@email.com', isExternal: true },
      { id: 'staff-1', name: 'Jennifer Martinez', email: 'groups@gracechurch.org', isExternal: false }
    ],
    lastMessageAt: '2024-01-18T16:00:00Z',
    messageCount: 2,
    unreadCount: 0,
    isArchived: false,
    labels: ['groups', 'new-visitor']
  },
  {
    id: 'thread-2',
    subject: 'Prayer Request',
    participants: [
      { id: 'p-3', name: 'Robert Thompson', email: 'robert@email.com', isExternal: true },
      { id: 'staff-2', name: 'Pastor Michael Chen', email: 'pastor@gracechurch.org', isExternal: false }
    ],
    lastMessageAt: '2024-01-19T09:15:00Z',
    messageCount: 3,
    unreadCount: 1,
    isArchived: false,
    labels: ['prayer', 'pastoral-care']
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Building Fund Update: We\'ve Reached 75%!',
    content: 'Thanks to your generous giving, we\'ve reached 75% of our building fund goal. Only $125,000 to go!',
    priority: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
    ctaText: 'Give Now',
    ctaUrl: '/giving',
    isPublished: true,
    isPinned: true,
    publishedAt: '2024-01-20T12:00:00Z',
    audienceType: 'all',
    authorId: 'staff-1',
    authorName: 'Pastor Michael Chen',
    viewCount: 342,
    likeCount: 89,
    commentCount: 12,
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T12:00:00Z'
  },
  {
    id: 'ann-2',
    title: 'Youth Winter Retreat Registration Open',
    content: 'Registration is now open for our annual Youth Winter Retreat! Join us February 15-17 at Camp Pinewood.',
    priority: 'normal',
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
    ctaText: 'Register Now',
    ctaUrl: '/events/youth-retreat',
    isPublished: true,
    isPinned: false,
    publishedAt: '2024-01-19T10:00:00Z',
    expiresAt: '2024-02-10T00:00:00Z',
    audienceType: 'age_bracket',
    authorId: 'staff-3',
    authorName: 'David Kim',
    viewCount: 156,
    likeCount: 45,
    commentCount: 8,
    createdAt: '2024-01-19T09:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z'
  },
  {
    id: 'ann-3',
    title: 'Volunteer Appreciation Dinner - Save the Date!',
    content: 'Mark your calendars! Our annual Volunteer Appreciation Dinner is scheduled for February 28th at 6 PM.',
    priority: 'normal',
    isPublished: true,
    isPinned: false,
    publishedAt: '2024-01-18T14:00:00Z',
    audienceType: 'volunteers',
    authorId: 'staff-2',
    authorName: 'Jennifer Martinez',
    viewCount: 89,
    likeCount: 34,
    commentCount: 5,
    createdAt: '2024-01-18T13:30:00Z',
    updatedAt: '2024-01-18T14:00:00Z'
  },
  {
    id: 'ann-4',
    title: 'New Sermon Series Starting This Sunday',
    content: 'Join us as we begin a new 6-week sermon series: "Finding Hope in Uncertain Times"',
    priority: 'normal',
    isPublished: true,
    isPinned: false,
    publishedAt: '2024-01-17T09:00:00Z',
    audienceType: 'all',
    authorId: 'staff-1',
    authorName: 'Pastor Michael Chen',
    viewCount: 423,
    likeCount: 112,
    commentCount: 18,
    createdAt: '2024-01-17T08:00:00Z',
    updatedAt: '2024-01-17T09:00:00Z'
  }
];

export const mockTemplates: MessageTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Welcome Email - First Time Visitor',
    description: 'Sent automatically to first-time visitors after they fill out a connect card',
    category: 'welcome',
    subject: 'Welcome to {{church_name}}!',
    content: 'Hi {{first_name}},\n\nThank you for visiting {{church_name}} this past Sunday! We hope you felt welcomed and would love to see you again.\n\nIf you have any questions, please don\'t hesitate to reach out.\n\nBlessings,\n{{pastor_name}}',
    htmlContent: '<h1>Welcome to {{church_name}}!</h1><p>Hi {{first_name}},</p><p>Thank you for visiting...</p>',
    supportedChannels: ['email'],
    variables: [
      { name: 'first_name', required: true, description: 'Recipient first name' },
      { name: 'church_name', defaultValue: 'Grace Community Church', required: false },
      { name: 'pastor_name', defaultValue: 'Pastor Michael', required: false }
    ],
    useCount: 156,
    lastUsedAt: '2024-01-21T10:30:00Z',
    isSystem: true,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'tmpl-2',
    name: 'Volunteer Schedule Reminder',
    description: 'Sent 48 hours before a volunteer is scheduled to serve',
    category: 'reminder',
    subject: 'Serving Reminder: {{service_date}}',
    content: 'Hi {{first_name}}, this is a reminder that you are scheduled to serve this {{day_of_week}} at {{service_time}} in {{ministry_area}}. Please reply if you have any questions or need to find a replacement.',
    supportedChannels: ['email', 'sms'],
    variables: [
      { name: 'first_name', required: true },
      { name: 'service_date', required: true },
      { name: 'day_of_week', required: true },
      { name: 'service_time', required: true },
      { name: 'ministry_area', required: true }
    ],
    useCount: 892,
    lastUsedAt: '2024-01-19T08:00:00Z',
    isSystem: true,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'tmpl-3',
    name: 'Event Registration Confirmation',
    description: 'Sent when someone registers for an event',
    category: 'event',
    subject: 'You\'re Registered: {{event_name}}',
    content: 'Hi {{first_name}},\n\nYou\'re all set! Here are the details:\n\nEvent: {{event_name}}\nDate: {{event_date}}\nTime: {{event_time}}\nLocation: {{event_location}}\n\nWe look forward to seeing you there!',
    supportedChannels: ['email', 'sms'],
    variables: [
      { name: 'first_name', required: true },
      { name: 'event_name', required: true },
      { name: 'event_date', required: true },
      { name: 'event_time', required: true },
      { name: 'event_location', required: true }
    ],
    useCount: 234,
    lastUsedAt: '2024-01-18T15:00:00Z',
    isSystem: true,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'tmpl-4',
    name: 'Small Group Follow-up',
    description: 'Sent to someone who expressed interest in joining a small group',
    category: 'follow_up',
    subject: 'Finding Your Small Group',
    content: 'Hi {{first_name}},\n\nThank you for your interest in joining a small group! Based on your preferences, we think you might enjoy:\n\n{{recommended_group}}\n\nWould you like more information about this group?',
    supportedChannels: ['email'],
    variables: [
      { name: 'first_name', required: true },
      { name: 'recommended_group', required: true }
    ],
    useCount: 67,
    lastUsedAt: '2024-01-17T11:00:00Z',
    isSystem: false,
    createdBy: 'Jennifer Martinez',
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'message',
    title: 'New Message',
    body: 'You have a new message from Emily Davis about Small Groups',
    recipientId: 'staff-1',
    isRead: false,
    actionUrl: '/communications?thread=thread-1',
    actionText: 'View Message',
    sourceType: 'message',
    sourceId: 'msg-3',
    createdAt: '2024-01-18T14:30:00Z'
  },
  {
    id: 'notif-2',
    type: 'reminder',
    title: 'Upcoming Event',
    body: 'Elder Board Meeting starts in 1 hour',
    recipientId: 'staff-1',
    isRead: true,
    readAt: '2024-01-23T18:00:00Z',
    actionUrl: '/events/evt-4',
    actionText: 'View Event',
    sourceType: 'event',
    sourceId: 'evt-4',
    createdAt: '2024-01-23T18:00:00Z'
  }
];

export const mockReminders: AutomatedReminder[] = [
  {
    id: 'rem-1',
    name: 'Volunteer Schedule Reminder',
    description: 'Remind volunteers 48 hours before they are scheduled to serve',
    triggerType: 'date_field',
    triggerValue: 'scheduled_date',
    offsetMinutes: -2880,
    offsetDirection: 'before',
    templateId: 'tmpl-2',
    channel: 'sms',
    subject: 'Serving Reminder',
    content: 'Hi {{first_name}}, reminder that you\'re serving this {{day_of_week}}!',
    audienceType: 'volunteers',
    isActive: true,
    lastTriggeredAt: '2024-01-19T08:00:00Z',
    triggerCount: 892,
    createdAt: '2023-06-01T00:00:00Z'
  },
  {
    id: 'rem-2',
    name: 'Event Reminder',
    description: 'Remind RSVPs 24 hours before an event',
    triggerType: 'event',
    triggerValue: 'event_start',
    offsetMinutes: -1440,
    offsetDirection: 'before',
    channel: 'email',
    subject: 'Reminder: {{event_name}} is Tomorrow!',
    content: 'Don\'t forget! {{event_name}} is tomorrow at {{event_time}}.',
    audienceType: 'custom',
    isActive: true,
    lastTriggeredAt: '2024-01-20T08:00:00Z',
    triggerCount: 156,
    createdAt: '2023-06-01T00:00:00Z'
  }
];

export const mockTeamChats: TeamChat[] = [
  {
    id: 'chat-1',
    name: 'Worship Team',
    description: 'Coordination for Sunday worship services',
    members: [
      { id: 'staff-3', name: 'Rachel Thompson', role: 'admin', joinedAt: '2023-01-01T00:00:00Z' },
      { id: 'vol-1', name: 'Mike Anderson', role: 'member', joinedAt: '2023-01-15T00:00:00Z' },
      { id: 'vol-2', name: 'Sarah Lee', role: 'member', joinedAt: '2023-02-01T00:00:00Z' }
    ],
    isPrivate: false,
    lastMessageAt: '2024-01-21T09:30:00Z',
    unreadCount: 2,
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'chat-2',
    name: 'Staff Chat',
    description: 'Internal staff communication',
    members: [
      { id: 'staff-1', name: 'Pastor Michael Chen', role: 'admin', joinedAt: '2023-01-01T00:00:00Z' },
      { id: 'staff-2', name: 'Jennifer Martinez', role: 'member', joinedAt: '2023-01-01T00:00:00Z' },
      { id: 'staff-3', name: 'David Kim', role: 'member', joinedAt: '2023-01-01T00:00:00Z' }
    ],
    isPrivate: true,
    lastMessageAt: '2024-01-21T11:00:00Z',
    unreadCount: 0,
    createdAt: '2023-01-01T00:00:00Z'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'cmsg-1',
    chatId: 'chat-1',
    senderId: 'staff-3',
    senderName: 'Rachel Thompson',
    content: 'Hey team! Just uploaded the chord charts for this Sunday. Please review when you get a chance.',
    createdAt: '2024-01-21T09:00:00Z',
    isEdited: false
  },
  {
    id: 'cmsg-2',
    chatId: 'chat-1',
    senderId: 'vol-1',
    senderName: 'Mike Anderson',
    content: 'Got it! The keys look good. Should we run through "Amazing Grace" one more time at rehearsal?',
    createdAt: '2024-01-21T09:15:00Z',
    isEdited: false
  },
  {
    id: 'cmsg-3',
    chatId: 'chat-1',
    senderId: 'staff-3',
    senderName: 'Rachel Thompson',
    content: 'Yes, let\'s do that. See everyone Thursday at 7!',
    reactions: [{ emoji: '👍', count: 2 }],
    createdAt: '2024-01-21T09:30:00Z',
    isEdited: false
  }
];

export const mockAnalytics: MessageAnalytics = {
  totalSent: 2847,
  totalDelivered: 2789,
  totalOpened: 1834,
  totalClicked: 567,
  openRate: 65.8,
  clickRate: 20.3,
  byChannel: {
    email: 1950,
    sms: 756,
    push: 141,
    in_app: 0
  },
  byDay: [
    { date: '2024-01-15', count: 45 },
    { date: '2024-01-16', count: 38 },
    { date: '2024-01-17', count: 52 },
    { date: '2024-01-18', count: 89 },
    { date: '2024-01-19', count: 67 },
    { date: '2024-01-20', count: 124 },
    { date: '2024-01-21', count: 156 }
  ]
};

export const audienceOptions = [
  { value: 'all', label: 'Everyone', count: 1250 },
  { value: 'volunteers', label: 'All Volunteers', count: 234 },
  { value: 'group', label: 'Small Group Members', count: 189 },
  { value: 'family', label: 'Families with Children', count: 312 },
  { value: 'age_bracket', label: 'By Age Group', count: null },
  { value: 'tag', label: 'By Tag', count: null },
  { value: 'custom', label: 'Custom Filter', count: null }
];
