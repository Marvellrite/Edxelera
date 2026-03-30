// types.ts
export interface Course {
  id: number;
  courseId: string;
  courseTitle: string;
  status: 'active' | 'inactive';
  enrollment: number;
  price: number;
  totalRevenue: number;
}

// mockData.ts
export const courses: Course[] = [
  {
    id: 1,
    courseId: '234930',
    courseTitle: 'Corporate Branding & Design',
    status: 'active',
    enrollment: 32,
    price: 200000.00,
    totalRevenue: 6400000.00
  },
  {
    id: 2,
    courseId: '234930',
    courseTitle: 'Product Design',
    status: 'active',
    enrollment: 40,
    price: 150000.00,
    totalRevenue: 6000000.00
  },
  {
    id: 3,
    courseId: '234930',
    courseTitle: 'Front End Development',
    status: 'active',
    enrollment: 40,
    price: 150000.00,
    totalRevenue: 6000000.00
  },
  {
    id: 4,
    courseId: '234930',
    courseTitle: 'Back End Development',
    status: 'active',
    enrollment: 40,
    price: 150000.00,
    totalRevenue: 6000000.00
  },
  {
    id: 5,
    courseId: '234930',
    courseTitle: 'Data Analytics',
    status: 'active',
    enrollment: 40,
    price: 150000.00,
    totalRevenue: 6000000.00
  },
  {
    id: 6,
    courseId: '234930',
    courseTitle: 'Full Stack Development',
    status: 'active',
    enrollment: 40,
    price: 150000.00,
    totalRevenue: 6000000.00
  },
  {
    id: 7,
    courseId: '234930',
    courseTitle: 'WordPress Development',
    status: 'active',
    enrollment: 40,
    price: 150000.00,
    totalRevenue: 6000000.00
  },
  {
    id: 8,
    courseId: '234930',
    courseTitle: 'Social Media Marketing',
    status: 'active',
    enrollment: 40,
    price: 150000.00,
    totalRevenue: 6000000.00
  }
];