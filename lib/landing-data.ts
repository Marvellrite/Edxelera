import type { Course, Testimonial, NavLink, StepItem, FeatureItem, BenefitItem } from '@/types/landing';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Courses', href: '#courses' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'FAQs', href: '#faqs' }
];

export const steps: StepItem[] = [
  {
    number: '01',
    title: 'Pick a Course',
    description: 'Choose from our vast variety of beginner-friendly tech courses'
  },
  {
    number: '02',
    title: 'Join a Cohort',
    description: 'Learn together with weekly modules opening at the same time.'
  },
  {
    number: '03',
    title: 'Learn & Practice',
    description: 'Watch lessons, complete tasks, submit assignments, get peer feedback.'
  }
];

export const features: FeatureItem[] = [
  {
    icon: '/icons/landing/messages.svg',
    title: 'Interactive Learning',
    description: 'With projects, quizzes, discussions, and hands-on activities, you stay engaged and retain more, making your learning journey both practical and enjoyable'
  },
  {
    icon: '/icons/landing/lightning.svg',
    title: 'Accelerated Learning',
    description: 'Clear, focused modules designed to help you learn faster without losing depth—so you gain practical skills in significantly shorter timeframes'
  },
  {
    icon: '/icons/landing/trophy.svg',
    title: 'Uncompromised Quality in Every Course',
    description: 'Each course is carefully crafted and reviewed by industry experts to ensure depth, clarity, and real-world relevance. Our structured modules, practical examples, and high-quality materials uphold a university-level standard that delivers lasting, meaningful learning'
  }
];

export const benefits: BenefitItem[] = [
  {
    icon: '/icons/landing/people.svg',
    text: 'Cohort-Based Learning With Real Classroom Feel'
  },
  {
    icon: '/icons/landing/heart-note.svg',
    text: 'Accountability That Helps You Finish'
  },
  {
    icon: '/icons/landing/ruler-pen.svg',
    text: 'Hands-On Practicals & Portfolio Projects'
  }
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Product Design (UI/UX)',
    price: '₦150,000.00',
    duration: '8 Weeks',
    rating: 5.0,
    thumbnail: '/images/landing/course-thumbnail.jpg'
  },
  {
    id: '2',
    title: 'Product Design (UI/UX)',
    price: '₦150,000.00',
    duration: '8 Weeks',
    rating: 5.0,
    thumbnail: '/images/landing/course-thumbnail.jpg'
  },
  {
    id: '3',
    title: 'Product Design (UI/UX)',
    price: '₦150,000.00',
    duration: '8 Weeks',
    rating: 5.0,
    thumbnail: '/images/landing/course-thumbnail.jpg'
  },
  {
    id: '4',
    title: 'Product Design (UI/UX)',
    price: '₦150,000.00',
    duration: '8 Weeks',
    rating: 5.0,
    thumbnail: '/images/landing/course-thumbnail.jpg'
  },
  {
    id: '5',
    title: 'Product Design (UI/UX)',
    price: '₦150,000.00',
    duration: '8 Weeks',
    rating: 5.0,
    thumbnail: '/images/landing/course-thumbnail.jpg'
  },
  {
    id: '6',
    title: 'Product Design (UI/UX)',
    price: '₦150,000.00',
    duration: '8 Weeks',
    rating: 5.0,
    thumbnail: '/images/landing/course-thumbnail.jpg'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Wali Beauty',
    role: 'Product Designer',
    avatar: '/images/landing/avatar.jpg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: '2',
    name: 'Wali Beauty',
    role: 'Product Designer',
    avatar: '/images/landing/avatar.jpg',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'
  },
  {
    id: '3',
    name: 'Wali Beauty',
    role: 'Product Designer',
    avatar: '/images/landing/avatar.jpg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
];