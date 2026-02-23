import { Course_status } from "@/types/my-courses/course-status";

const mock_data = [
   {
      posterSrc: '/assets/poster3.jpg',
      title: 'Engaging UI/UX Design',
      completion_date: '20th January, 2025',
      status: Course_status.completed,
   },
   {
      posterSrc: '/assets/poster1.jpg',
      title: 'Social Media Marketing',
      completion_date: '1st October, 1960',
      status: Course_status.completed,
   },
];

export default mock_data;
