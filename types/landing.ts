// Types for landing page data

export interface Course {
  _id: string;
  title: string;
  price: string;
  duration: string;
  rating: number;
  posterSrc: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  icon: string;
  text: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}