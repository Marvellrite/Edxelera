import { Course_status } from './types';

const mock_data = [
   {
      posterSrc: '/assets/poster3.jpg',
      title: 'Engaging UI/UX Design',
      completion_date: '20th January, 2025',
      status: Course_status.completed,
   },
   {
      posterSrc: '/assets/poster2.jpg',
      title: 'Engaging UI/UX Design',
      starting_date: '20th January, 2025',
      current_duration: 'Week 2',
      progress: 30,
      status: Course_status.ongoing,
   },
   {
      posterSrc: '/assets/poster1.jpg',
      title: 'Social Media Marketing',
      completion_date: '1st October, 1960',
      status: Course_status.completed,
   },
];

export default mock_data;
