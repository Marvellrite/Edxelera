// types.ts
export interface Course {
  id: string;
  title: string;
  status: 'Live' | 'Draft' | 'Suspended';
  enrollment: number | string;
  price: string;
  dateAdded: string;
}

// mockData.ts
export const courses: Course[] = [
  {
    id: '234930',
    title: 'Product Design',
    status: 'Live',
    enrollment: 32,
    price: '₦150,000.00',
    dateAdded: '07-05-2025'
  },
  {
    id: '234930',
    title: 'Corporate Branding & Design',
    status: 'Live',
    enrollment: 40,
    price: '₦150,000.00',
    dateAdded: '07-05-2025'
  },
  {
    id: '234930',
    title: 'Front End Development',
    status: 'Live',
    enrollment: 40,
    price: '₦150,000.00',
    dateAdded: '07-05-2025'
  },
  {
    id: '234930',
    title: 'Back End Development',
    status: 'Live',
    enrollment: 40,
    price: '₦150,000.00',
    dateAdded: '07-05-2025'
  },
  {
    id: '234930',
    title: 'Data Analytics',
    status: 'Live',
    enrollment: 40,
    price: '₦150,000.00',
    dateAdded: '07-05-2025'
  },
  {
    id: '234930',
    title: 'Full Stack Development',
    status: 'Live',
    enrollment: 40,
    price: '₦150,000.00',
    dateAdded: '07-05-2025'
  },
  {
    id: '234930',
    title: 'WordPress Development',
    status: 'Draft',
    enrollment: '--',
    price: '--',
    dateAdded: '--'
  },
  {
    id: '234930',
    title: 'Social Media Marketing',
    status: 'Suspended',
    enrollment: 40,
    price: '₦150,000.00',
    dateAdded: '07-05-2025'
  }
];