// types.ts
export interface Staff {
  id: number;
  name: string;
  email: string;
  avatar: string;
  userId: string;
  role: 'Super admin' | 'Instructor' | 'Support admin' | 'Admin';
  status: 'active' | 'inactive' | 'suspended';
  dateAdded: string;
  isOnline?: boolean;
}

// mockData.ts
export const staffMembers: Staff[] = [
  {
    id: 1,
    name: 'Utange Kevin Kator',
    email: 'oscaramadi@gmail.com',
    avatar: '/avatars/utange-kevin-kator.jpg', // Replace with actual path
    userId: '234930',
    role: 'Super admin',
    status: 'active',
    dateAdded: '07-05-2025',
    isOnline: true
  },
  {
    id: 2,
    name: 'Utange Kevin Kator',
    email: 'oscaramadi@gmail.com',
    avatar: '/avatars/utange-kevin-kator.jpg',
    userId: '234930',
    role: 'Instructor',
    status: 'active',
    dateAdded: '07-05-2025',
    isOnline: true
  },
  {
    id: 3,
    name: 'Utange Kevin Kator',
    email: 'oscaramadi@gmail.com',
    avatar: '/avatars/utange-kevin-kator.jpg',
    userId: '234930',
    role: 'Support admin',
    status: 'active',
    dateAdded: '07-05-2025',
    isOnline: true
  }
];