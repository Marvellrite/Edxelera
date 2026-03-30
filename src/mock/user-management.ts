// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  userId: string;
  courseAccess: CourseAccess[];
  role: 'Student' | 'Admin' | 'Instructor';
  status: 'active' | 'suspended' | 'inactive';
  dateJoined: string;
  isOnline?: boolean;
}

export interface CourseAccess {
  courseName: string;
  courseId?: string;
}

// mockData.ts
export const users: User[] = [
  {
    id: 1,
    name: 'Oscar Amadi',
    email: 'oscaramadi@gmail.com',
    avatar: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340440/repo-images/public/avatars/oscar-amadi.jpg', // Replace with actual path
    userId: '234930',
    courseAccess: [
      { courseName: 'Product Design' },
      { courseName: 'Corporate Branding & Design' },
      { courseName: 'Front End Development' }
    ],
    role: 'Student',
    status: 'active',
    dateJoined: '07-05-2025',
    isOnline: true
  },
  {
    id: 2,
    name: 'John Crew',
    email: 'johncrew@gmail.com',
    avatar: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340440/repo-images/public/avatars/oscar-amadi.jpg',
    userId: '234930',
    courseAccess: [
      { courseName: 'Front End' },
      { courseName: 'Back End Development' }
    ],
    role: 'Student',
    status: 'active',
    dateJoined: '07-05-2025',
    isOnline: true
  },
  {
    id: 3,
    name: 'Christopher Emeka',
    email: 'emekachris@gmail.com',
    avatar: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340439/repo-images/public/avatars/christopher-emeka.jpg',
    userId: '234930',
    courseAccess: [],
    role: 'Student',
    status: 'suspended',
    dateJoined: '07-05-2025',
    isOnline: false
  }
];