// types.ts
export interface DashboardStats {
  totalRevenue: {
    current: number;
    lastMonth: number;
    percentageChange: number;
  };
  activeLearners: {
    current: number;
    lastMonth: number;
    percentageChange: number;
  };
  totalTransactions: {
    current: number;
    lastMonth: number;
    percentageChange: number;
  };
}

export interface Transaction {
  id: number;
  email: string;
  courseTitle: string;
  cohort: string;
  amount: number;
  dateTime: string;
  status: 'Successful' | 'Failed' | 'Pending';
}

// mockData.ts
export const dashboardStats: DashboardStats = {
  totalRevenue: {
    current: 900400,
    lastMonth: 840000,
    percentageChange: 4.9
  },
  activeLearners: {
    current: 16487,
    lastMonth: 13892,
    percentageChange: 4.9
  },
  totalTransactions: {
    current: 400,
    lastMonth: 800,
    percentageChange: -4.9
  }
};

export const transactions: Transaction[] = [
  {
    id: 1,
    email: 'Kevinkator79@gmail.com',
    courseTitle: 'Corporate Branding & Design',
    cohort: 'October Cohort 1',
    amount: 200000.00,
    dateTime: '07-05-2025 3:00am',
    status: 'Successful'
  },
  {
    id: 2,
    email: 'Gloriaspeaksgerman@yahoo.com',
    courseTitle: 'Front-end development',
    cohort: 'November Cohort 1',
    amount: 200000.00,
    dateTime: '07-05-2025 3:00am',
    status: 'Successful'
  },
  {
    id: 3,
    email: 'Gloriaspeaksgerman@yahoo.com',
    courseTitle: 'Front-end development',
    cohort: 'November Cohort 1',
    amount: 200000.00,
    dateTime: '07-05-2025 3:00am',
    status: 'Successful'
  },
  {
    id: 4,
    email: 'Gloriaspeaksgerman@yahoo.com',
    courseTitle: 'Front-end development',
    cohort: 'November Cohort 1',
    amount: 200000.00,
    dateTime: '07-05-2025 3:00am',
    status: 'Successful'
  },
  {
    id: 5,
    email: 'Gloriaspeaksgerman@yahoo.com',
    courseTitle: 'Front-end development',
    cohort: 'November Cohort 1',
    amount: 200000.00,
    dateTime: '07-05-2025 3:00am',
    status: 'Successful'
  }
];


// Helper function to format percentage change
export const formatPercentageChange = (percentage: number): string => {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage}%`;
};