// types.ts
export interface Notification {
  id: number;
  title: string;
  deliveryChannels: DeliveryChannel[];
  recipientGroup: RecipientGroup;
  status: 'Sent' | 'Scheduled' | 'Draft' | 'Failed';
  dateCreated: string;
}

export type DeliveryChannel = 'Email' | 'Push Notification' | 'SMS' | 'In-App';

export interface RecipientGroup {
  primaryGroup: string;
  additionalCount?: number;
}

// mockData.ts
export const notifications: Notification[] = [
  {
    id: 1,
    title: 'Course Start',
    deliveryChannels: ['Email', 'Push Notification'],
    recipientGroup: {
      primaryGroup: 'New Users',
      additionalCount: 2
    },
    status: 'Sent',
    dateCreated: '07-05-2025'
  },
  {
    id: 2,
    title: 'Welcome new users',
    deliveryChannels: ['Email', 'Push Notification'],
    recipientGroup: {
      primaryGroup: 'New Users',
      additionalCount: 2
    },
    status: 'Scheduled',
    dateCreated: '07-05-2025'
  },
  {
    id: 3,
    title: 'Course Start',
    deliveryChannels: ['Email', 'Push Notification'],
    recipientGroup: {
      primaryGroup: 'New Users',
      additionalCount: 2
    },
    status: 'Draft',
    dateCreated: '07-05-2025'
  }
];

// Alternative expanded format if you need more details
export interface NotificationExpanded extends Notification {
  content?: string;
  recipientGroups: string[]; // Full list of all groups
  scheduledTime?: string;
  sentTime?: string;
  createdBy?: string;
}

export const notificationsExpanded: NotificationExpanded[] = [
  {
    id: 1,
    title: 'Course Start',
    deliveryChannels: ['Email', 'Push Notification'],
    recipientGroup: {
      primaryGroup: 'New Users',
      additionalCount: 2
    },
    recipientGroups: ['New Users', 'October Cohort 1', 'November Cohort 1'],
    status: 'Sent',
    dateCreated: '07-05-2025',
    sentTime: '07-05-2025 3:00am',
    content: 'Your course is starting soon!'
  },
  {
    id: 2,
    title: 'Welcome new users',
    deliveryChannels: ['Email', 'Push Notification'],
    recipientGroup: {
      primaryGroup: 'New Users',
      additionalCount: 2
    },
    recipientGroups: ['New Users', 'First Time Students', 'Trial Users'],
    status: 'Scheduled',
    dateCreated: '07-05-2025',
    scheduledTime: '08-05-2025 9:00am',
    content: 'Welcome to TBC LMS!'
  },
  {
    id: 3,
    title: 'Course Start',
    deliveryChannels: ['Email', 'Push Notification'],
    recipientGroup: {
      primaryGroup: 'New Users',
      additionalCount: 2
    },
    recipientGroups: ['New Users', 'Pending Enrollment', 'Active Students'],
    status: 'Draft',
    dateCreated: '07-05-2025',
    content: 'Draft notification content...'
  }
];